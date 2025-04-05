var jwt = require("jsonwebtoken");
const Users = require("../models/users.model")

const auth = (role) => async(req, res, next) => {
  try {
    const token =
      req.cookies.accessToken

    if (!token) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "token not found",
      });
    }

    const varifyTocken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(varifyTocken._id);

    if (!varifyTocken) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "token not verify",
      });
    }

    const user = await Users.findById(varifyTocken._id);
    console.log("user",user);

    if (!user) {
        return res.status(400).json({
            success: false,
            data: [],
            message: "user not found",
        });
    }

    if (!role.includes(varifyTocken.role)) {
        return res.status(400).json({
          success: false,
          message: "you don't have an access",
        });
      }   

    req.user = user;

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in server: " + error.message,
    });
  }
};

module.exports = auth