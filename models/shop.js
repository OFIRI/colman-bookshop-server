import mongoose from "mongoose";
const { Schema } = mongoose;

const shopSchema = new Schema({
  location: {
    city: { type: String, required: true },
    street: { type: String, required: true },
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

// get shop by id
Shop.getShopById = (id, callback) => {
  Shop.findOne({ _id: id }).exec(callback);
};

// create shop
Shop.createShop = (newShop, callback) => {
  let shop = new Shop(newShop);
  shop.save(callback);
};

// update shop by shop id
Shop.updateShop = (shopId, updatedShop, callback) => {
  Shop.findOneAndUpdate(shopId, updatedShop).exec(callback);
};

// delete shop by shop id
Shop.deleteShop = (shopId, callback) => {
  Shop.findOneAndDelete({ _id:shopId }).exec(callback);
};