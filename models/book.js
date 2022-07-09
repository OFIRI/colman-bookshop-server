import { Schema } from "mongoose";

const bookSchema = Schema({
    _id: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    author: { type: String },
    inventory: { type: Number },
});

const books = module.export = mongoose.model("book", bookSchema);

module.export.getAllBooks = (callback) => {
    books.find().exec(callback);
};