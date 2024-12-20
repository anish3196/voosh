const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: false,
        default: bcrypt.hashSync("12345678"),
      },
      
      role: {
        type: String,
        required: true,
        default: "Admin",
        enum: [
          "Admin",
          "Editor",
          "Viewer",
        ],
      },

    },
    {
      timestamps: true,
    }
  );



const User = mongoose.model("User", userSchema);

module.exports = User;