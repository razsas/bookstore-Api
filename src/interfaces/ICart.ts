import { PopulatedDoc } from "mongoose"
import { IUser } from "./IUser"
import { IBook } from "./IBook"

export interface IItem{
    itemId:PopulatedDoc<IBook> | string,
    amount:number,
}
export interface ICart{
    currentCart:IItem[],
    user: PopulatedDoc<IUser> | string,
    history:ICartHistory,
}
export interface ICartHistory{
    carts:{ items:IItem[], dateBought:Date}[]
}
export interface ICartItem{
    book:IBook,
    amount:number,
}

// const hello:{[index:string]: any}={}
// let item!:{itemId: string, amount:Number} 
//cart:{itemId: string, amount:Number}[]