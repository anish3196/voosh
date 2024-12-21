const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const jwt = require("jsonwebtoken");
const { signInToken, tokenForVerify, sendEmail } = require("../config/auth");
const {createResponse} =  require("../utils/response.util")
const User = require("../models/User");



const registerUser = async (req, res) => {
  try {
    const isAdded = await User.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(409).json(
        createResponse(409, null, "Email already exists.", null)
      );
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();
    const token = signInToken(user);
    
    res.status(201).json(
      createResponse(201, {
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }, "User registered successfully.", null)
    );
  } catch (err) {
    res.status(500).json(
      createResponse(500, null, "Registration failed.", err.message)
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.body.email });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = signInToken(admin);
      res.status(200).json(
        createResponse(200, {
          token,
          _id: admin._id,
          name: admin.name,
          email: admin.email,
        }, "Login successful.", null)
      );
    } else {
      res.status(401).json(
        createResponse(401, null, "Invalid email or password.", null)
      );
    }
  } catch (err) {
    res.status(500).json(
      createResponse(500, null, "Login failed.", err.message)
    );
  }
};

const logoutUser = (req, res) => {
  res.status(200).json(createResponse(200, null, "Logout successful.", null));
};




const resetPassword = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(
        createResponse(404, null, "User not found.", null)
      );
    }

    const { old_password, new_password } = req.body;
    const isMatch = bcrypt.compareSync(old_password, user.password);
    
    if (!isMatch) {
      return res.status(400).json(
        createResponse(400, null, "Old password is incorrect.", null)
      );
    }

    user.password = bcrypt.hashSync(new_password);
    await user.save();

    res.status(200).json(
      createResponse(200, null, "Password changed successfully.", null)
    );
  } catch (err) {
    res.status(500).json(
      createResponse(500, null, "Password reset failed.", err.message)
    );
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.status(200).json(
      createResponse(200, users, "Users retrieved successfully.", null)
    );
  } catch (err) {
    res.status(500).json(
      createResponse(500, null, "Failed to retrieve users.", err.message)
    );
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json(
        createResponse(404, null, "User not found.", null)
      );
    }
    res.status(200).json(
      createResponse(200, user, "User retrieved successfully.", null)
    );
  } catch (err) {
    res.status(500).json(
      createResponse(500, null, "Failed to retrieve user.", err.message)
    );
  }
};

const addUser = async (req, res) => {
  // console.log("add staf....", req.body.userData);
  try {
    const isAdded = await User.findOne({ email: req.body.userData.email });
    if (isAdded) {
      return res.status(400).send({
        message: "This Email already Added!",
      });
    } else {
      const newUser = new User({
        name: req.body.userData.name ,
        email: req.body.userData.email,
        password: bcrypt.hashSync(req.body.userData.password),
        role: req.body.userData.role,
      });
      await newUser.save();
      res.status(200).send({
        message: "User Added Successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
    // console.log("error", err);
  }
};


const updateUser = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.params.id });
    
    if (!admin) {
      return res.status(404).json(
        createResponse(404, null, "User not found.", null)
      );
    }

    admin.name = { ...admin.name, ...req.body.name };
    admin.email = req.body.email;
    admin.phone = req.body.phone;
    admin.role = req.body.role;
    admin.forcepwreset = false;
    admin.password = req.body.password !== undefined
      ? bcrypt.hashSync(req.body.password)
      : admin.password;
    admin.image = req.body.image;

    const updatedUser = await admin.save();
    const token = signInToken(updatedUser);

    res.status(200).json(
      createResponse(200, {
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      }, "User updated successfully.", null)
    );
  } catch (err) {
    res.status(500).json(
      createResponse(500, null, "Failed to update user.", err.message)
    );
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json(
        createResponse(404, null, "User not found.", null)
      );
    }
    res.status(200).json(
      createResponse(200, null, "User deleted successfully.", null)
    );
  } catch (err) {
    res.status(500).json(
      createResponse(500, null, "Failed to delete user.", err.message)
    );
  }
};


module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  addUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
};
