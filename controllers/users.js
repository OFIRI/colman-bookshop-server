import { Router } from 'express';
const router = Router();
import { User } from '../models/user.js';

// http get for /users/
router.get('/', (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.json(400, {
            message: `Failed to load all users. Error: ${err}`
         });
        res.send(users);
    });
});

// http get for /users/:id
router.get('/:id', (req, res) => {
    User.getUserById((err) => {
        if (err) return res.json(400, {
            message: `Failed to load user. Error: ${err}`
         });

        res.send('not implemented yet');
    });
});

export default router;