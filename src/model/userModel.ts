import mongoose from "mongoose"
import { IUser } from "../interfaces/IUser"

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: true,
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minLength: 8,
    },//roll, token, cart in reff
},{
    timestamps: true
})
export const User = mongoose.model("User", userSchema)