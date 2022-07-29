import { Shop } from "../../models/shop.js";

export default () => {
  let shops = [
    {
      _id: "1",
      location: {
        city: "Tel Aviv",
        street: "Allenbi 87",
      },
    },
    {
      _id: "2",
      location: {
        city: "Tel Aviv",
        street: "Malkhi Yisrael 9",
      },
    },
    {
      _id: "3",
      location: {
        city: "Tel Aviv",
        street: "Shabazi 36",
      },
    },
    {
      _id: "4",
      location: {
        city: "Tel Aviv",
        street: "Frishman 90",
      },
    },
  ];

  for (let i = 0; i < shops.length; i++) {
    Shop.findById({ _id: shops[i]._id }).exec((err, shop) => {
      if (err) {
        throw err;
      }

      // if the document doesn't exist
      if (!shop) {

        // Create a new one
        let newShop = new Shop(shops[i]);
        newShop.save((err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
  }
};
