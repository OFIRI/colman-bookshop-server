import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Number, required: true },
});

export const User = mongoose.model("user", userSchema);

// get all users
export const getAllUsers = (callback) => {
    User.find().exec(callback);
};

// get user by id
export const getUserById = (id, callback) => {
    let query = { _id: id };
    return (User.findOne(query).populate("users").exec(callback));
};

// create user
export const createUser = (newUser, callback) => {
    User.save(newUser).exec(callback);
};

// update user by User id
export const updateUser = (updatedUser, callback) => {
    User.save(updatedUser).exec(callback);
};

// delete user by user id
export const deleteUser = (userId, callback) => {
    User.deleteOne({ _id:userId }).exec(callback);
};