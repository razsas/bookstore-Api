import mongoose from "mongoose"
import { IBook } from "../interfaces/IBook"

const bookSchema = new mongoose.Schema<IBook>({
    name:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    author:{
        type: String,
        trim: true,
        required: true,
    },
    genere:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        enum: ['sci-fi',"mystery","romance","fantasy","thriller"]
    },
    publisher:{
        type: String,
        trim: true,
        required: [true,"put the damn value!!!!!"],
    },
    sellerRating:{
        type: Number,
        trim: true,
        required: true,
        min: 1,
        max: 100,
    },
    publishYear:{
        type: Number,
        trim: true,
        required: true,
        min: 1000,
        max: 2100,
    },
    price:{
        type: Number,
        trim: true,
        required: true,
        min: 1,
        max: 100,
    },
    discount:{
        type: Number,
        trim: true,
        min: 0,
        max: 100,
        default: 0,
    }
},{
    timestamps: true
})
export const Book = mongoose.model<IBook>("Book", bookSchema)