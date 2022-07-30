import { Shop } from "../../models/shop.js";

export default () => {
  let shops = [
    {
      location: {
        city: "Tel Aviv",
        street: "Allenbi 87",
      },
    },
    {
      location: {
        city: "Tel Aviv",
        street: "Malkhi Yisrael 9",
      },
    },
    {
      location: {
        city: "Tel Aviv",
        street: "Shabazi 36",
      },
    },
    {
      location: {
        city: "Tel Aviv",
        street: "Frishman 90",
      },
    },
  ];

  for (let i = 0; i < shops.length; i++) {
    Shop.find({ location: shops[i].location }).exec((err, shop) => {
      if (err) {
        throw err;
      }

      // if the document doesn't exist
      if (!shop.length) {

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
