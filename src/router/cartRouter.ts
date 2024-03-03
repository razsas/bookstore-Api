import { Router,Request,Response } from "express";
import { UserCart } from "../model/cartModel";
import { addToCart, createCart, saveToHistory } from "../middelware/service";
import { User } from "../model/userModel";

export const cartRouter = Router()

cartRouter.post("/cart", async (req,res)=>{
    const {item,id} = req.body
    try {
        let cart = await UserCart.findOne({user:id})
        if (cart) addToCart(cart, item)
        else cart = createCart(id, item)
        await cart.save()
        res.send(cart)
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})
cartRouter.get("/cart", async (req,res)=>{
    const id = req.query.id
    try {
        const userCart = await UserCart.findOne({user:id}).populate("currentCart.itemId")
        res.send(userCart?.currentCart)
    } catch (err) {
        res.status(400).send(err)
    }
})
cartRouter.get("/history", async (req,res)=>{
    const id = req.query.id
    try {
        const userHistory = await UserCart.findOne({user:id}).populate("history.carts.items.itemId")
        res.send(userHistory)
    } catch (err) {
        res.status(400).send(err)
    }
})
cartRouter.post("/checkout", async (req,res)=>{
    const user = req.body.id
    try {
        let userCart = await UserCart.findOne({user})
        if (userCart?.currentCart.length && userCart?.currentCart.length>0){
            userCart = saveToHistory(userCart)
            await userCart!.save()
        }
        else throw new Error("cart is empty or wrong user");
        res.send(userCart)
    } catch (err) {
        console.log(err);
        
        res.status(400).send(err)
    }
})
cartRouter.post("/user", async (req:Request,res:Response)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})