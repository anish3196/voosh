const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Album name is required"],
      trim: true
    },
    year: {
      type: Number,
      required: [true, "Release year is required"],
      min: [1900, "Year must be after 1900"],
      max: [new Date().getFullYear(), "Year cannot be in the future"]
    },
    hidden: {
      type: Boolean,
      default: false
    },
    artist_id: {
      type: String,
      required: [true, "Artist reference is required"]
    }
  },
  {
    timestamps: true
  }
);


albumSchema.index({ name: 1 });
albumSchema.index({ year: -1 });
albumSchema.index({ hidden: 1 });
albumSchema.index({ artist_id: 1 });


const Album = mongoose.model("Album", albumSchema);

module.exports = Album;