import { Router } from 'express';
const router = Router();
import { Book } from '../models/book.js';

// http get for /books/
router.get('/', (req, res) => {
    Book.getAllBooks((err, books) => {
        if (err) return res.json(400, {
            message: `Failed to load all books. Error: ${err}`
         });
        res.send(books);
    });
});

export default router;