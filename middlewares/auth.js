import jwt from "jsonwebtoken";

const authorize = (req, res, next) => {
  const bearer = req.headers.authorization;

  const token = bearer.replace('Bearer','').trim();

  if (!token) return res.status(403).send("please log in");

  try {
    const decoded = jwt.verify(token, "myprivatekey");

    if (decoded) {
        res.locals.session = decoded;
        return next();
    }

  } catch (e) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};

export default authorize;