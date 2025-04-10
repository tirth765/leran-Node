// npm bcrypt download for creating hash password
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Users = require("../models/users.model");
const Mailer = require("../utils/nodeMailer");

const generate_user = async (userID) => {
  const user = await Users.findById(userID);

  const accessToken = await jwt.sign(
    {
      _id: user._id,
      role: user.role,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRED }
  );

  const refreshToken = await jwt.sign(
    {
      _id: user._id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRED,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRED }
  );

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
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
      
      Mailer()

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

const user_login = async (req, res) => {
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

    const PasswordValid = await bcrypt.compare(password, user.password);

    if (!PasswordValid) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Invalid password",
      });
    }

    const userData = await Users.findById(user._id).select(
      "-password-refreshToken"
    );

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
        data: userData,
        message: "Login successful",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Error in server: " + error.message,
    });
  }
};

const generateNewTokens = async (req, res) => {
  try {
    console.log(
      req.cookies.refreshToken,
      req.headers.authorization.replace("Bearer ", "")
    );

    const token =
      req.cookies.refreshToken ||
      req.headers.authorization.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "token not found",
      });
    }

    try {
      const varifyTocken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      console.log(varifyTocken._id);

      if (!varifyTocken) {
        return res.status(400).json({
          success: false,
          data: [],
          message: "token not verify",
        });
      }

      const user = await Users.findById(varifyTocken._id);
      console.log(user);

      if (user.refreshToken !== token) {
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: [],
        message: "Error in server: " + error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Error in server: " + error.message,
    });
  }
};

const user_logout = async (req, res) => {
  try {
    console.log(req.body._id);

    const data = await Users.findByIdAndUpdate(
      req.body._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    console.log(data);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logout successfull",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Error in server: " + error.message,
    });
  }
};

const check_Auth = async (req, res) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.headers.authorization.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "token not found",
      });
    }

    const varifyTocken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(varifyTocken._id);

    if (!varifyTocken) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "token not verify",
      });
    }

    const userData = await Users.findById(varifyTocken._id).select(
      "-password -refreshToken"
    );

    return res.status(200).json({
      success: true,
      data: userData,
      message: "check successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Error in server: " + error.message,
    });
  }
};

module.exports = {
  registerUser,
  user_login,
  generateNewTokens,
  user_logout,
  check_Auth,
  generate_user
};
