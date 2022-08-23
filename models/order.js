import mongoose from "mongoose";
import { Book } from "./book.js";
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    books: [
        {
            book: {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
            quantity: {type: Number}
        }
    ],
    price: {type: Number}
});

export const Order = mongoose.model("order", orderSchema);

Order.createNewOrder = async (books, userId, price) => {
    const order = new Order({
        books,
        user: userId,
        price: price
    });
    const savedOrder = await order.save();

    return savedOrder.toJSON();
}

Order.getAllOrders = async () => {
    const orders = await Order.find().populate("user").populate("books.book");
    return orders;
}

Order.getUsersOrder = async (userId) => {
    return await Order.find({userId});
}

Order.getOrderById = async (id) => {
    return await Order.findById(id);
} 

Order.updateOrder = async(order) => {
    const doc = await Order.findById(order.id)
    doc.price = order.price;
    return await doc.save();
}

Order.deleteOrder = async(id) => {
    const doc = await Order.deleteOne({_id: id});
    return doc;
}