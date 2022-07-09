import { Schema } from "mongoose";

const bookSchema = Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    author: { type: String, required: true },
    inventory: { type: Number, required: true },
});

const books = module.export = mongoose.model("book", bookSchema);

module.export.getAllBooks = (callback) => {
    books.find().exec(callback);
};