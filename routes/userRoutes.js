const express = require("express");
const router = express.Router();
const {
  resetPassword,
  addUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");



//reset-password
router.put("/update-password", resetPassword);

//add a user
router.post("/add-user", addUser);

//get all user
router.get("/", getAllUser);

//get a user
router.post("/:id", getUserById);

//update a user
router.put("/:id", updateUser);

//delete a user
router.delete("/:id", deleteUser);

module.exports = router;
