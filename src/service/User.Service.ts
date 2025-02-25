import {UserDTO} from "../dto/User.DTO";
import {AuthModel} from "../models/Auth.Model";
import bcrypt from 'bcryptjs'
import {UserModel} from "../models/User.Model";
import LoginRequestDTO from "../dto/LoginRequest.DTO";
import {AuthDocument} from "../documents/Auth.Document";
import {claimEmailFromToken, generateAccessToken, generateRefreshToken} from "./Jwt.Service";
import DataIntegrityViolationError from "../errors/DataIntegrityViolation.Error";
import InvalidAuthenticationDetailsError from "../errors/InvalidAuthenticationDetails.Error";
import {GlobalErrorHandlerMiddleware} from "../middleWare/GlobalErrorHandler.Middleware";
import {sendMail} from "./MailService";
import {config} from "dotenv";
import {Role} from "../utils/Role";


config()
type Response = { jwtAccessToken: string, jwtRefreshToken: string };

const RESET_PASS_URL: string = process.env.RESET_PASSWORD_URL!

/**
 * Checks if the user exists by their username asynchronously.
 *
 * Returns `true` upon successful operation.
 *
 * @param {string} username - username to check
 * @returns {Promise<boolean>}
 */
async function isUserExistsByUsername(username: string): Promise<boolean> {
    const exists = await UserModel.exists({username});
    return !!exists
}

/**
 * Checks the user existence by email asynchronously
 *
 * Returns `true` upon successful operation.
 *
 * @param {string} email - email to check
 * @returns {Promise<Readonly<AuthDocument> | null}
 */
async function findUserModelByEmail(email: string): Promise<Readonly<AuthDocument> | null> {
    return AuthModel.findOne({email}).exec();
}

async function findByEmail(email: string): Promise<void> {
    const user: AuthDocument | null = await AuthModel.findOne({email}).exec();

    if (!user)
        throw new InvalidAuthenticationDetailsError('user not found', 400);
}

/**
 * Saves a new user to the database
 *
 * Before saving, it checks whether the user already exists using {@link isUserExistsByUsername}.
 * If the user exists, an error is thrown.
 * If the user passed the check, the password is hashed, and the data will be
 * partitioned to {@link AuthModel} and {@link UserModel } and saved to the database
 *
 * @param{UserDTO} user - user to be saved to the database.
 * @returns{Promise<boolean>} - Resolves as `true` upon successful operation.
 */
export async function saveUser(user: UserDTO): Promise<Response> {
    if (await isUserExistsByUsername(user.username))
        throw new DataIntegrityViolationError("User already exists.", 400);

    const hashPassword: string = await bcrypt.hash(user.password, 10);

    try {
        await AuthModel.create({email: user.email, password: hashPassword});
        await UserModel.create({email: user.email, username: user.username});
        console.info('user initiated successfully');

        const jwtAccessToken: string = generateAccessToken(user.email, [Role.USER]);

        return {jwtAccessToken: jwtAccessToken, jwtRefreshToken: generateRefreshToken(jwtAccessToken)};
    } catch (error: any) {
        console.error('failed to initiate user');
        throw new DataIntegrityViolationError("User Already Exists", 400)
    }
}

/**
 * Process the login request
 *
 * Fetches the {@link AuthDocument} by the help of {@link findUserModelByEmail}.
 * If it is null, an Error thrown.
 * If it is not null and contains a password, The password will be compared with the requested password.
 * If the password comparison fails, it returns `null`.
 * After successful password comparison, it generates the `JWT` using {@link generateToken}
 *
 * @param{LoginRequestDTO} request - login request
 * @returns{Promise<string | null>} - `JWT` token if promise is not null.
 */
export async function handleLoginRequest(request: LoginRequestDTO): Promise<Response & { isAdmin: boolean } | null> {
    const {email, password} = request;
    const model: Awaited<ReturnType<typeof findUserModelByEmail>> = await findUserModelByEmail(email);

    console.log(email)

    if (!model) throw new InvalidAuthenticationDetailsError("Invalid email address. Try again", 401);
    console.info(`model ${model.email}`)

    const isTrue: boolean = await bcrypt.compare(password, model.password)
    if (!isTrue) throw new GlobalErrorHandlerMiddleware("Incorrect password. Try again", 401);

    const accessToken: string = generateAccessToken(email, model.roles);
    return isTrue ? {
        jwtAccessToken: accessToken,
        jwtRefreshToken: generateRefreshToken(accessToken),
        isAdmin: model.roles.includes(Role.ADMIN)
    } : null;
}

export function handleRefreshTokenRequest(token: string): Response {
    const acc: string = generateRefreshToken(claimEmailFromToken(token)!);
    return {jwtAccessToken: acc, jwtRefreshToken: generateRefreshToken(acc)};
}

export async function handleGoogleAuthUser(googleId: string, email: string, username: string): Promise<Response> {
    const user: AuthDocument | null = await AuthModel.findOne({googleId: googleId}).exec();
    if (!user) {
        try {
            await AuthModel.create({email: email, googleId: googleId});
            await UserModel.create({email: email, username: username});
            console.info("Auth user successfully initialized");
        } catch (e) {
            console.error(e);
        }
    }

    const accessToken: string = generateAccessToken(email, user ? user.roles : [Role.USER]);
    const refreshToken: string = generateRefreshToken(accessToken);

    return {jwtAccessToken: accessToken, jwtRefreshToken: refreshToken};
}

export async function sendResetPasswordURL(email: string): Promise<void> {
    const user: AuthDocument | null = await AuthModel.findOne({email}).exec();

    if (!user)
        throw new InvalidAuthenticationDetailsError('user not found', 400);

    sendMail(user.email, 'Reset password', RESET_PASS_URL);
    console.info('reset password email sent');
}

export async function updatePassword(email: string, password: string): Promise<void> {
    await findByEmail(email);
    await AuthModel.findOneAndUpdate({email}, {password: password}).exec();

    console.info('password updated');
}

export async function updateUser(email: string, data: Partial<Omit<UserDTO, 'email'>>): Promise<void> {

    if ('email' in data)
        throw new InvalidAuthenticationDetailsError('cannot update email', 400)

    await findByEmail(email);
    await UserModel.findOneAndUpdate({email}, {$set: data}).exec();

    console.info('user updated successfully');
}


export async function updatePermissions(email: string, permissions: Role[]): Promise<void> {

    await findByEmail(email);
    await AuthModel.findOneAndUpdate({email}, {roles: permissions}).exec();
    console.info('user permissions updated successfully');
}

export async function replaceUser(email: string, data: UserDTO): Promise<void> {
    if (data.email == email)
        throw new InvalidAuthenticationDetailsError("cannot change email", 4000);

    const user: AuthDocument | null = await AuthModel.findOne({email}).exec();

    if (!user)
        throw new InvalidAuthenticationDetailsError('user not found', 400);

    await UserModel.findOneAndReplace({email}, data).exec();
}


