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

// http get for /users/:username/:password
router.get('/:username/:password', (req, res) => {
    User.signIn(req.params.username, req.params.password, (err, user) => {
        if (err) return res.json(400, {
            message: `Failed to load user. Error: ${err}`
         });

        res.send(user);
    });
});

// http post for /users/
router.post('/', (req, res) => {
    let newUser =  new User({
        username: req.body.username,
        password: req.body.password,
        is_admin: req.body.is_admin
    });

    User.createUser(newUser, (err, user) => {
        if (err) return res.status(400).json({
            message: `Failed to create user. Error: ${err}`
         });

        res.send(user);
    });
});

export default router;