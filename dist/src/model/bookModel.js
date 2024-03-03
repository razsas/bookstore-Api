"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    author: {
        type: String,
        trim: true,
        required: true,
    },
    genere: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        enum: ['sci-fi', "mystery", "romance", "fantasy", "thriller"]
    },
    publisher: {
        type: String,
        trim: true,
        required: [true, "put the damn value!!!!!"],
    },
    sellerRating: {
        type: Number,
        trim: true,
        required: true,
        min: 1,
        max: 100,
    },
    publishYear: {
        type: Number,
        trim: true,
        required: true,
        min: 1000,
        max: 2100,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        min: 1,
        max: 100,
    },
    discount: {
        type: Number,
        trim: true,
        min: 0,
        max: 100,
        default: 0,
    }
}, {
    timestamps: true
});
exports.Book = mongoose_1.default.model("Book", bookSchema);
