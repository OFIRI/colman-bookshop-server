import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    author: { type: String, required: true },
    inventory: { type: Number, required: true },
});

export const Book = mongoose.model("book", bookSchema);

// get all books (search fields are optional)
Book.getAllBooks = (fields, callback) => {
    Book.find(fields).exec(callback);
};

// get book by id
Book.getBookById = (id, callback) => {
    Book.findOne({ _id: id }).exec(callback);
};

// create book
Book.createBook = (newBook, callback) => {
    let book = new Book(newBook);
    book.save(callback);
};

// update book by book id
Book.updateBook = (bookId, updatedBook, callback) => {
    Book.findOneAndUpdate(bookId, updatedBook).exec(callback);
};

// delete book by book id
Book.deleteBook = (bookId, callback) => {
    Book.findOneAndDelete({ _id:bookId }).exec(callback);
};

// get total inventory
Book.getBooksCountByAuthor = (callback) => {
    Book.aggregate([
        {
        $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same author, MongoDB will increment `count`.
            _id: '$author',
            count: { $sum: 1 }
        }
        }
    ]).exec(callback);
}