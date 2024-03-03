"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const bookModel_1 = require("../model/bookModel");
exports.bookRouter = (0, express_1.Router)();
exports.bookRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchWord = req.query.searchWord || "";
    const regex = new RegExp(searchWord, 'i');
    try {
        const books = yield bookModel_1.Book.find({ name: { $regex: regex } });
        res.send(books);
    }
    catch (err) {
        res.status(400).send();
    }
}));
exports.bookRouter.post("/books/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new bookModel_1.Book(req.body);
    try {
        yield book.save();
        res.send(book);
    }
    catch (err) {
        res.status(400).send();
    }
}));
exports.bookRouter.patch("/books/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allowdUpdates = ["name", "author", "genere", "publisher", "sellerRating", "publishYear", "price", "discount"];
    for (let update in req.body) {
        if (!allowdUpdates.includes(update)) {
            return res.status(400).send({
                status: 400,
                message: "Invalid update: " + update,
            });
        }
    }
    const id = req.query.id;
    try {
        const book = yield bookModel_1.Book.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true });
        if (!book)
            return res.status(404).send({
                status: 404,
                message: "wrong id",
            });
        console.log(book);
        yield book.save();
        res.send(book);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.bookRouter.delete("/books/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const book = yield bookModel_1.Book.findByIdAndDelete(id);
        res.send(book);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
