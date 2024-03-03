import { IItem, ICart } from "../interfaces/ICart";
import { UserCart } from "../model/cartModel";

export function createCart(id:string,item:IItem){
    const cart = {
        currentCart:[item],
        user:id,
        history:{}
    }
    const userCart = new UserCart(cart)
    return userCart
}
export function addToCart(userCart:ICart, item:IItem){
    let exist = false
    const elementsToRemove:number[] = []
    userCart.currentCart.forEach((element,index) => {
        if (element.itemId === item.itemId){
            element.amount = element.amount + item.amount
            if (element.amount <= 0) elementsToRemove.push(index)
            exist = true
        }
    })
    if (!exist && item.amount>0) userCart.currentCart.push(item)
    while (elementsToRemove.length>0){
        const index = elementsToRemove.pop()
        userCart.currentCart.splice(index!,1)
    }
    return userCart
}
export function saveToHistory(userCart:any){
    try {
        const pastCart = {
            dateBought: new Date(),
            items:userCart.currentCart
        }
        userCart.history.carts.push(pastCart)
        userCart.currentCart = []
        return userCart
    } catch (e) {
        console.log(e);
    }
}
