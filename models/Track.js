const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Track name is required"],
      trim: true
    },
    duration: {
      type: Number,
      required: [true, "Track duration is required"],
      min: [1, "Duration must be at least 1 second"]
    },
    hidden: {
      type: Boolean,
      default: false
    },
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: [true, "Album reference is required"]
    },
    artist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: [true, "Album reference is required"]
    }
  },
  {
    timestamps: true
  }
);

// Create indexes
trackSchema.index({ name: 1 });
trackSchema.index({ duration: 1 });
trackSchema.index({ hidden: 1 });
trackSchema.index({ album: 1 });;



const Track = mongoose.model("Track", trackSchema);

module.exports = Track;