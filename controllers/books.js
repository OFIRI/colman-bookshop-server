import { Router } from 'express';
const router = Router();
import { Book } from '../models/book.js';

// http get for /books/
router.get('/', (req, res) => {
    Book.getAllBooks(req.query, (err, books) => {
        if (err) return res.status(400).json({
            message: `Failed to load books. Error: ${err}`
         });
        res.send(books);
    });
});

// http get for /books/:id
router.get('/:id', (req, res) => {
    Book.getBookById(req.params.id, (err, books) => {
        if (err) return res.json(400, {
            message: `Failed to load book. Error: ${err}`
         });
        res.send(books);
    });
});

// http post for /books/
router.post('/', (req, res) => {
    let newBook =  {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        author: req.body.author,
        inventory: req.body.inventory,
    };

    Book.createBook(newBook, (err, book) => {
        if (err) return res.status(400).json({
            message: `Failed to create book. Error: ${err}`
         });

        res.send(book);
    });
});

// http put for /books/:id
router.put('/:id', (req, res) => {
    Book.getBookById(req.params.id, (err, oldBook) => {
        if (err) return res.json(400, {
            message: `Failed to find book. Error: ${err}`
         });
        let updatedBook = {
            title: req.body.title || oldBook.title,
            description: req.body.description || oldBook.description,
            price: req.body.price || oldBook.price,
            author: req.body.author || oldBook.author,
            inventory: req.body.inventory || oldBook.inventory,
        };
    
        Book.updateBook(req.params.id, updatedBook, (err, book) => {
            if (err) return res.status(400).json({
                message: `Failed to update book. Error: ${err}`
             });
    
            res.send(book);
        });
    });
});

// http delete for /books/:id
router.delete('/:id', (req, res) => {
    Book.deleteBook(req.params.id, (err) => {
        if (err) return res.json(400, {
            message: `Failed to delete book. Error: ${err}`
         });

         res.json({ success: true, message: `Book deleted successfuly` });
    });
});

export default router;