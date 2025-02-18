export interface UserDocument extends Document{
    email: string
    username:string
    createdAt: Date
    updatedAt: Date
}
