import mongoose from "mongoose"
import { ICart } from "../interfaces/ICart"

// const itemInCartSchema = new mongoose.Schema<IItem>({
//     itemId:{
//         type: String,
//         trim: true,
//         required: true,
//     },
//     amount:{
//         type: Number,
//         required: true,
//     }
// },{
//     timestamps: true
// })
// const cartSchema = new mongoose.Schema<ICart>({
//     cart:{
//         type:[itemInCartSchema]
//     }
// },{
//     timestamps: true
// })
const cartSchema = new mongoose.Schema<ICart>({
    currentCart:[{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
        amount:{
            type: Number,
        },
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    history:{
        carts:[{
            items:[{
                itemId:{
                    type: String,
                },
                amount:{
                    type: Number,
                },
            }],
            dateBought:{
                type:Date,
                required: false
            }
        }]
    }
},{
    timestamps: true,
})
export const UserCart = mongoose.model("Cart", cartSchema)