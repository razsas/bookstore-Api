"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToHistory = exports.addToCart = exports.createCart = void 0;
const cartModel_1 = require("../model/cartModel");
function createCart(id, item) {
    const cart = {
        currentCart: [item],
        user: id,
        history: {}
    };
    const userCart = new cartModel_1.UserCart(cart);
    return userCart;
}
exports.createCart = createCart;
function addToCart(userCart, item) {
    let exist = false;
    const elementsToRemove = [];
    userCart.currentCart.forEach((element, index) => {
        if (element.itemId === item.itemId) {
            element.amount = element.amount + item.amount;
            if (element.amount <= 0)
                elementsToRemove.push(index);
            exist = true;
        }
    });
    if (!exist && item.amount > 0)
        userCart.currentCart.push(item);
    while (elementsToRemove.length > 0) {
        const index = elementsToRemove.pop();
        userCart.currentCart.splice(index, 1);
    }
    return userCart;
}
exports.addToCart = addToCart;
function saveToHistory(userCart) {
    try {
        const pastCart = {
            dateBought: new Date(),
            items: userCart.currentCart
        };
        userCart.history.carts.push(pastCart);
        userCart.currentCart = [];
        return userCart;
    }
    catch (e) {
        console.log(e);
    }
}
exports.saveToHistory = saveToHistory;
