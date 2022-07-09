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

module.export.getBookById = (id, callback) => {
    let query = { _id: id };
    return (books.findOne(query).populate("books").exec(callback));
};

// create book
module.export.createBook = (newBook, callback) => {
    newBook.save(callback);
};

// update book by book id
module.export.updateBook;

// delete book by book id
module.export.deleteBook;