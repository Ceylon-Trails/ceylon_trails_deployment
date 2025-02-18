import {UserDocument} from "../documents/User.Document";
import {AuthDocument} from "../documents/Auth.Document";

type User = UserDocument & AuthDocument

export class UserDTO implements Partial<User> {
    private readonly _email: string;
    private readonly _username: string;
    private readonly _googleId:string;
    private readonly _password: string;

    constructor(email: string, password: string,googleId:string, username: string) {
        this._email = email;
        this._password = password;
        this._username = username;
        this._googleId = googleId;
    }

    get email(): string {
        return this._email;
    }

    get username(): string {
        return this._username;
    }
    get googleId():string{
        return this._googleId;
    }

    get password(): string {
        return this._password;
    }
}