const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    console.log("Token not found");
    return res.status(401).json({ error: "Authorization token required", status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.log("Error verifying token");
      return res.status(401).json({ error: "Request is not authorized", status: false })
    } else {
      //console.log("Token verified");
      const user = await User.findById(data.id)
      if (user) {
        //console.log("User found");
        req.authenticatedUser = user.username;
        //res.json({ status: true, user: user.username });
        return next();
      }
      else 
      {
        console.log("User not found");
        req.authenticatedUser = null;
        return res.status(401).json({ error: "Request is not authorized", status: false });
      }
    }
  });
}
