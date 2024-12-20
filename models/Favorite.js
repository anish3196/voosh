const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ['artist', 'album', 'track']
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Item ID is required"],
      refPath: 'category'
    }
  },
  {
    timestamps: true
  }
);

favoriteSchema.index({ category: 1 });
favoriteSchema.index({ item_id: 1 });

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
