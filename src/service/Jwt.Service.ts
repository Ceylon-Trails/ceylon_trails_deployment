import {config} from 'dotenv';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {Role} from "../utils/Role";

config();

type Payload = { email: string, roles: Role[], issued: number };

type TokenInputs = { email: string, roles: Role[], exp: string, secret: string }

type Options = { expiresIn: number };

const SECRET: string = process.env.JWT_SECRET!;
const REFRESH: string = process.env.JWT_REFRESH_SECRET!
const ACCESS_EXPIRATION: string = process.env.JWT_ACCESS_TOKEN_EXPIRATION!;
const REFRESH_EXPIRATION: string = process.env.JWT_REFRESH_TOKEN_EXPIRATION!;

function generateToken({email, roles, exp, secret}: TokenInputs): string {

    const payload: Payload = {email: email, roles: roles, issued: Date.now()};
    const options: Options = {expiresIn: parseInt(exp)};

    return jwt.sign(payload, secret, options);
}

export function generateAccessToken(email: string, roles: Role[]): string {
    return generateToken({email: email, roles: roles, secret: SECRET, exp: ACCESS_EXPIRATION})
}

export function claimEmailFromToken(token: string): string | null {
    const decoded = jwt.verify(token, SECRET) as { email?: string };

    if (!decoded.email) {
        throw Error('Email not found in token');
    }

    return decoded.email
}

export function generateRefreshToken(token: string): string {
    const decoded: JwtPayload | string = jwt.decode(token) as JwtPayload;

    if (!decoded) throw new Error("Invalid token: Email not found");
    const email: string = decoded.email;
    const roles: Role[] = decoded.roles;

    return generateToken({email: email, roles: roles, secret: REFRESH, exp: REFRESH_EXPIRATION})
}

