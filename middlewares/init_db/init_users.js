import { User } from "../../models/user.js";

export default () => {
  let users = [
    {
      _id: "111",
      username: "Colman",
      password: "111",
      is_admin: true,
    },
    {
      _id: "222",
      username: "Emma",
      password: "222",
      is_admin: true,
    },
    {
      _id: "333",
      username: "John",
      password: "333",
      is_admin: false,
    },
  ];

  for (let i = 0; i < users.length; i++) {
    User.findById({ _id: users[i]._id }).exec((err, user) => {
      if (err) {
        throw err;
      }

      // if the document doesn't exist
      if (!user) {
        // Create a new one
        let newUser = new User(users[i]);
        newUser.save((err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
  }
};
