import {Role} from "../utils/Role";

export interface AuthDocument extends Document{
    email:string
    password: string
    googleId?:string
    roles:Role[];
    createdAt: Date
    updatedAt: Date
}

