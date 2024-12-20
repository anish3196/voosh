require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {createResponse} =  require("../utils/response.util")


const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: "15m" }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json(
        createResponse(401, null, "No authorization token provided.", null)
      );
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json(
        createResponse(401, null, "Invalid authorization format.", null)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json(
      createResponse(401, null, "Authentication failed.", err.message)
    );
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const admin = await User.findOne({ 
      _id: req.user._id,  // Add this to check the current user
      role: "Admin" 
    });

    if (admin) {
      next();
    } else {
      res.status(401).json(
        createResponse(401, null, "Access denied. Admin privileges required.", null)
      );
    }
  } catch (err) {
    res.status(401).json(
      createResponse(401, null, "Authorization check failed.", err.message)
    );
  }
};


const isAdminOrEditor = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user._id, 
      role: { $in: ["Admin", "Editor"] } // Check if role is either Admin or Editor
    });

    if (user) {
      next();
    } else {
      res.status(401).json(
        createResponse(401, null, "Access denied. Admin or Editor privileges required.", null)
      );
    }
  } catch (err) {
    res.status(401).json(
      createResponse(401, null, "Authorization check failed.", err.message)
    );
  }
};




module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  isAdminOrEditor,
};
