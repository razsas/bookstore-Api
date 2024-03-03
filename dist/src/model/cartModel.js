"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
const cartSchema = new mongoose_1.default.Schema({
    currentCart: [{
            itemId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Book",
            },
            amount: {
                type: Number,
            },
        }],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    history: {
        carts: [{
                items: [{
                        itemId: {
                            type: String,
                        },
                        amount: {
                            type: Number,
                        },
                    }],
                dateBought: {
                    type: Date,
                    required: false
                }
            }]
    }
}, {
    timestamps: true,
});
exports.UserCart = mongoose_1.default.model("Cart", cartSchema);
