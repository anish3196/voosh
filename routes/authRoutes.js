const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controller/userController");
//register a user
router.post("/signup", registerUser);

//login a user
router.post("/login", loginUser);





module.exports = router;