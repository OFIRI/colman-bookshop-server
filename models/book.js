import { Schema } from "mongoose";

const bookSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    author: { type: String, required: true },
    inventory: { type: Number, required: true },
});

const Book = module.export = mongoose.model("book", bookSchema);

// get all books
module.export.getAllBooks = (callback) => {
    Book.find().exec(callback);
};

// get book by id
module.export.getBookById = (id, callback) => {
    let query = { _id: id };
    return (Book.findOne(query).populate("books").exec(callback));
};

// create book
module.export.createBook = (newBook, callback) => {
    Book.save(newBook).exec(callback);
};

// update book by book id
module.export.updateBook = (updatedBook, callback) => {
    Book.save(updatedBook).exec(callback);
};

// delete book by book id
module.export.deleteBook = (bookId, callback) => {
    Book.deleteOne({ _id:bookId }).exec(callback);
};