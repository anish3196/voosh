const express = require("express");
const router = express.Router();

const { isAuth } = require("../config/auth");
const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controller/userController");
//register a user
router.post("/signup", registerUser);

//login a user
router.post("/login", loginUser);

router.post("/logout", isAuth,logoutUser);





module.exports = router;