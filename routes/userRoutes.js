const express = require("express");
const router = express.Router();
const { isAdmin, isAdminOrEditor } = require("../config/auth");

const {
  resetPassword,
  addUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");



//reset-password
router.put("/update-password", isAdminOrEditor ,resetPassword);

//add a user
router.post("/add-user", isAdmin,addUser);

//get all user
router.get("/", isAdmin,getAllUser);

//get a user
router.post("/:id", isAdminOrEditor,getUserById);

//update a user
router.put("/:id", isAdminOrEditor,updateUser);

//delete a user
router.delete("/:id",isAdmin, deleteUser);

module.exports = router;
