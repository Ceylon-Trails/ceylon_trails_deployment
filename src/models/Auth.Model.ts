import {Model, model, Schema} from "mongoose";
import {AuthDocument} from "../documents/Auth.Document";
import {Role} from "../utils/Role";

const authModel = new Schema<AuthDocument>({
    email: {type: String, required: true, unique: true},
    password: {type: String, sparse: true},
    googleId: {type: String, sparse: true},
    roles: {type: [String], enum: Object.values(Role), default: [Role.USER]},
    createdAt: {type: Date, default: new Date(), immutable: true},
    updatedAt: {type: Date, default: new Date()},
});

export const AuthModel: Model<AuthDocument> = model<AuthDocument>("authentication", authModel);