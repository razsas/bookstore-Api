import { Router } from "express";
import { Book } from "../model/bookModel";
import { IBook } from "../interfaces/IBook";

export const bookRouter = Router()

bookRouter.get("/books", async (req,res)=>{
    const searchWord = req.query.searchWord || ""
    const regex: RegExp = new RegExp(searchWord as string, 'i')
    try {
        const books = await Book.find({name:{$regex: regex}})
        res.send(books)
    } catch (err) {
        res.status(400).send()
    }
})
bookRouter.post("/books/new", async (req,res)=>{
    const book = new Book(req.body)
    try {
        await book.save()
        res.send(book)
    } catch (err) {
        res.status(400).send()
    }
})
bookRouter.patch("/books/edit", async (req,res)=>{
    const allowdUpdates: (keyof IBook)[] = ["name", "author", "genere", "publisher","sellerRating","publishYear","price","discount"]
    for (let update in req.body) {
		if (!allowdUpdates.includes(update as keyof IBook)) {
			return res.status(400).send({
				status: 400,
				message: "Invalid update: " + update,
			})
		}
	}
    const id = req.query.id;
    try {
        const book = await Book.findByIdAndUpdate(id,{...req.body},{new:true})
        if (!book) 
			return res.status(404).send({
				status: 404,
				message: "wrong id",
			})
        console.log(book)    
		await book.save()
		res.send(book)
    } catch (err) {
        res.status(400).send(err)
    }
})
bookRouter.delete("/books/delete", async (req,res)=>{
    const id = req.query.id;
    try {
        const book = await Book.findByIdAndDelete(id)
        res.send(book)
    } catch (err) {
        res.status(400).send(err)
    }
})