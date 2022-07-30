import { User } from "../../models/user.js";

export default () => {
  let users = [
    {
      username: "Colman",
      password: "111",
      is_admin: true,
    },
    {
      username: "Emma",
      password: "222",
      is_admin: true,
    },
    {
      username: "John",
      password: "333",
      is_admin: false,
    },
  ];

  for (let i = 0; i < users.length; i++) {
    User.find({ username: users[i].username }).exec((err, user) => {
      if (err) {
        throw err;
      }

      // if the document doesn't exist
      if (!user.length) {
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
