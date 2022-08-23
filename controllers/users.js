import { Router } from 'express';
import jwt from 'jsonwebtoken'
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

router.get('/getUser/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
});

// http get for /users/:username/:password
router.post('/sign-in', (req, res) => {
    const { username, password } = req.body;
    User.signIn(username, password, (err, user) => {
        if (err) return res.json(400, {
            message: `Failed to load user. Error: ${err}`
        });

        const token = jwt.sign({userId: user.id}, "myprivatekey");

        res.send({token, user});
    });
});

// http post for /users/
router.post('/register', async (req, res) => {
    let newUser =  {
        username: req.body.username,
        password: req.body.password,
        is_admin: req.body.is_admin,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };

    const exist = await User.findOne({username: newUser.username});
    if(exist) return;
    let user = new User(newUser);
    const saved = await user.save();

    const token = jwt.sign({userId: user.id}, "myprivatekey");

    res.send({token, user: saved.toJSON()});

    // User.createUser(newUser, async (err, user) => {
    //     if (err) return res.status(400).json({
    //         message: `Failed to create user. Error: ${err}`
    //      });

    //     const token = jwt.sign({userId: user.id}, "myprivatekey");

    //     res.send({token, user});

    // });
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