import {AuthDocument} from "../documents/Auth.Document";

class LoginRequestDTO implements Partial<AuthDocument> {
    private readonly _email: string
    private readonly _password: string
    private readonly  _googleId:string;

    constructor(email: string, password: string,googleId:string) {
        this._email = email;
        this._password = password;
        this._googleId = googleId;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }
}

export default LoginRequestDTO