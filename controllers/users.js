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
router.put('/', (req, res) => {
    // User.getUserById(req.params.id, (err, oldUser) => {
    //     if (err) return res.json(400, {
    //         message: `Failed to find user. Error: ${err}`
    //      });
    //     let updatedUser = {
    //         username: req.body.username || oldUser.username,
    //         password: req.body.password || oldUser.password,
    //         is_admin: req.body.is_admin || oldUser.is_admin
    //     };
    
    //     User.updateUser(req.params.id, updatedUser, (err, user) => {
    //         if (err) return res.status(400).json({
    //             message: `Failed to update user. Error: ${err}`
    //          });
    
    //         res.send(user);
    //     });
    // });
    const user = req.body;
    try {
        User.updateUser(user);
        res.send("ok")
    } catch (error) {
        res.status(500).send(e.message);
    }
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

router.get('/search', async (req, res) => {
    const {username, first_name, last_name} = req.query;
    let fn = new RegExp(first_name,'i');
    let ln = new RegExp(last_name,'i');
    let un = new RegExp(username,'i');
    const orArray = [];
    if(username !== '') orArray.push({username: {"$regex": un}});
    if(first_name !== '') orArray.push({first_name: {"$regex": fn}});
    if(last_name !== '') orArray.push({last_name: {"$regex": ln}});
    let users = null;
    if(orArray.length > 0) {
        users = await User.find({
            $and: orArray
        });
    } else {
        users = await User.find();
    }
    res.send(users);
})

export default router;