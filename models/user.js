import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Number, required: true },
});

export const User = mongoose.model("user", userSchema);

// get all users
User.getAllUsers = (callback) => {
    User.find().exec(callback);
};

// get user by username and password
User.signIn = (username, password, callback) => {
    let query = { username: username, password: password };
    return (User.findOne(query).exec(callback));
};

// create user
User.createUser = (newUser, callback) => {
    let user = new User(newUser);
    user.save(callback);
};

// update user by User id
User.updateUser = (updatedUser, callback) => {
    User.save(updatedUser).exec(callback);
};

// delete user by user id
User.deleteUser = (userId, callback) => {
    User.deleteOne({ _id:userId }).exec(callback);
};