import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Number, required: true },
    first_name: { type: String },
    last_name: { type: String },
});

export const User = mongoose.model("user", userSchema);

// get all users
User.getAllUsers = (callback) => {
    User.find().exec(callback);
};

// get user by id
User.getUserById = (id, callback) => {
    User.findOne({ _id: id}).exec(callback);
};

// get user by username and password
User.signIn = (username, password, callback) => {
    let query = { username: username, password: password };
    return (User.findOne(query).exec(callback));
};

// create user
// User.createUser = async (newUser, callback) => {
//     const exist = await User.exists({username});
//     if(!exist) return;
//     let user = new User(newUser);
//     user.save(callback);
// };

// update user by user id
User.updateUser = async (user) => {
    const doc = await User.findById(user.id);
    doc.first_name = user.first_name;
    doc.last_name = user.last_name;
    doc.username = user.username;
    doc.is_admin = user.is_admin ? 1 : 0;
    await doc.save();
};

// delete user by user id
User.deleteUser = (userId, callback) => {
    User.findOneAndDelete({ _id:userId }).exec(callback);
};