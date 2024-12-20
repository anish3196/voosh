const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true
    },
    grammy: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);


artistSchema.index({ name: 1 });
artistSchema.index({ hidden: 1 });



const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;