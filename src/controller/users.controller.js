// npm bcrypt download for creating hash password
const bcrypt = require("bcrypt");
const Users = require("../models/users.model");
var jwt = require("jsonwebtoken");

const register_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await Users.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "user is already exist",
      });
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      const User = await Users.create({ ...req.body, password: hashPassword });

      const userData = await Users.findById(User._id).select("-password");

      return res.status(201).json({
        success: true,
        data: userData,
        message: "successFull data add",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: [],
        message: "error in server" + error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "error in server" + error.message,
    });
  }
};

const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "User not found",
      });
    }

   

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Invalid password",
      });
    }

    const userData = await Users.findById(user._id).select("-password -refreshToken");
    
    const { accessToken, refreshToken } = await generateNewTocken(user._id)
    
    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json({
      success: true,
      data: userData,
      message: "Login Succesful"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Error in server: " + error.message,
    });
  }
};

const generateNewTocken = async (userId) => {

    const user = Users.findById(userId)
    console.log("hi",user._id);
    
  const accessToken = jwt.sign(
        {
            id: user._id,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRED
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRED }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRED
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRED }
    );

    console.log(accessToken, refreshToken);

    return { accessToken, refreshToken }
    
};

const refreshTokens = async (req, res) => {
    
    // console.log(req.headers.authorization.replace("Bearer ", ""));
    
    const token = req.headers.authorization.replace("Bearer ", "")
    console.log(token);

    if(!token) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "token not found",
      });
    }

    const varifyTocken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    console.log(varifyTocken._id);

    if(!varifyTocken) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "token not varifyed",
      });
    }
    
    const user = await Users.findById(varifyTocken._id);
    console.log(user);

    if(user.refreshToken !== token) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "invalid user token",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generate_user(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        data: user,
        message: "Token created successfully",
      });

}


const logout_user = async (req, res) => {};

module.exports = {
  register_user,
  login_user,
  logout_user,
  refreshTokens
};
