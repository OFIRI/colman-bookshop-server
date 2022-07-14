import { Router } from 'express';
const router = Router();
import { Book } from '../models/book.js';

// http get to /books/
router.get('/', (req, res) => {
    Book.getAllBooks((err) => {
        if (err) return res.json(400, {
            message: `Failed to load all users. Error: ${err}`
         });
    });
});

export default router;