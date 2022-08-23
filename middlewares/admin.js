import { User } from "../models/user.js";

const admin = async (req, res, next) => {
  const userId = res.locals.session;

  const user = await User.findById(userId);

  if(!user.is_admin) return res.status(401).send("Unauthorized");

  return next();

};

export default admin;