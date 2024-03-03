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
exports.cartRouter = void 0;
const express_1 = require("express");
const cartModel_1 = require("../model/cartModel");
const service_1 = require("../middelware/service");
const userModel_1 = require("../model/userModel");
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.post("/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item, id } = req.body;
    try {
        let cart = yield cartModel_1.UserCart.findOne({ user: id });
        if (cart)
            (0, service_1.addToCart)(cart, item);
        else
            cart = (0, service_1.createCart)(id, item);
        yield cart.save();
        res.send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
exports.cartRouter.get("/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const userCart = yield cartModel_1.UserCart.findOne({ user: id }).populate("currentCart.itemId");
        res.send(userCart === null || userCart === void 0 ? void 0 : userCart.currentCart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.cartRouter.get("/history", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const userHistory = yield cartModel_1.UserCart.findOne({ user: id }).populate("history.carts.items.itemId");
        res.send(userHistory);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.cartRouter.post("/checkout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.id;
    try {
        let userCart = yield cartModel_1.UserCart.findOne({ user });
        if ((userCart === null || userCart === void 0 ? void 0 : userCart.currentCart.length) && (userCart === null || userCart === void 0 ? void 0 : userCart.currentCart.length) > 0) {
            userCart = (0, service_1.saveToHistory)(userCart);
            yield userCart.save();
        }
        else
            throw new Error("cart is empty or wrong user");
        res.send(userCart);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
exports.cartRouter.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.User(req.body);
    try {
        yield user.save();
        res.send(user);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
