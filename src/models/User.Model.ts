import {Model, model, Schema} from "mongoose";
import {UserDocument} from "../documents/User.Document";

const userModel: Schema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: new Date(), immutable: true},
    updatedAt: {type: Date, default: new Date()},
});

export const UserModel: Model<UserDocument> = model<UserDocument>("user", userModel)