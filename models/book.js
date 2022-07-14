import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    author: { type: String, required: true },
    inventory: { type: Number, required: true },
});

export const Book = mongoose.model("book", bookSchema);

// get all books
export const getAllBooks = (callback) => {
    Book.find().exec(callback);
};

// get book by id
export const getBookById = (id, callback) => {
    let query = { _id: id };
    return (Book.findOne(query).populate("books").exec(callback));
};

// create book
export const createBook = (newBook, callback) => {
    Book.save(newBook).exec(callback);
};

// update book by book id
export const updateBook = (updatedBook, callback) => {
    Book.save(updatedBook).exec(callback);
};

// delete book by book id
export const deleteBook = (bookId, callback) => {
    Book.deleteOne({ _id:bookId }).exec(callback);
};