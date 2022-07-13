import { Router } from 'express';
const router = Router();
// import { book } from '../models/book.js';

// http get to /books/
router.get('/', (req, res) => {
    book.getAllBooks((err) => {
        if (err) return res.json(400, {
            message: `Failed to load all users. Error: ${err}`
         });
    });
});

// http get to /books/{id}

export default router;