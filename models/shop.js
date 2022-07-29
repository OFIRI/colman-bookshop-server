import mongoose from "mongoose";
const { Schema } = mongoose;

const shopSchema = new Schema({
  _id: { type: String, required: true },
  location: {
    city: { type: String },
    street: { type: String },
    coordinates: {
      long: { type: String },
      lat: { type: String },
    },
  },
});

export const Shop = mongoose.model("shop", shopSchema);

// get all shops
Shop.getAllShops = (callback) => {
  Shop.find().exec(callback);
};