import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    books: {type: [mongoose.Schema.Types.ObjectId], ref: 'book'},
    price: {type: Number}
});

export const Order = mongoose.model("order", orderSchema);

Order.createNewOrder = (books, userId, callback) => {
    const order = new Order({
        books,
        userId: userId
    });
    order.save(callback)
}

Order.getAllOrders = (callback) => {
    Order.find().exec(callback);
}