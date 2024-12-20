const express = require("express");
const router = express.Router();


const {
    logoutUser
  } = require("../controller/userController");


router.post("/logout", logoutUser);
  
  
  
  
module.exports = router;
