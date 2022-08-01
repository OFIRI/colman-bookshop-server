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
    let newUser =  {
        username: req.body.username,
        password: req.body.password,
        is_admin: req.body.is_admin
    };

    User.createUser(newUser, (err, user) => {
        if (err) return res.status(400).json({
            message: `Failed to create user. Error: ${err}`
         });

        res.send(user);
    });
});

// http put for /users/:id
router.put('/:id', (req, res) => {
    User.getUserById(req.params.id, (err, oldUser) => {
        if (err) return res.json(400, {
            message: `Failed to find user. Error: ${err}`
         });
        let updatedUser = {
            username: req.body.username || oldUser.username,
            password: req.body.password || oldUser.password,
            is_admin: req.body.is_admin || oldUser.is_admin
        };
    
        User.updateUser(req.params.id, updatedUser, (err, user) => {
            if (err) return res.status(400).json({
                message: `Failed to update user. Error: ${err}`
             });
    
            res.send(user);
        });
    });
});

// http delete for /users/:id
router.delete('/:id', (req, res) => {
    User.deleteUser(req.params.id, (err) => {
        if (err) return res.json(400, {
            message: `Failed to delete user. Error: ${err}`
         });

         res.json({ success: true, message: `User deleted successfuly` });
    });
});

export default router;