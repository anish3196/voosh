const Favorite = require('../models/Favorite'); 
const Artist = require('../models/Artist'); 
const Album = require('../models/Album'); 
const Track = require('../models/Track'); 
const mongoose = require("mongoose");
const { createResponse } = require('../utils/response.util'); 


const getFavoritesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 5; // Default limit is 5
    const offset = parseInt(req.query.offset) || 0; // Default offset is 0

    // Validation for required fields
    if (!category) {
      return res.status(400).json(createResponse(400, null, "Category is required"));
    }

    const favorites = await Favorite.find({ category })
      .skip(offset)
      .limit(limit);

    // Retrieve and add names based on category
    const favoritesWithNames = await Promise.all(favorites.map(async (favorite) => {
      let itemName = '';

      if (favorite.category === 'artist') {
        if (mongoose.Types.ObjectId.isValid(favorite.item_id)) {
          const item = await Artist.findById(favorite.item_id).select('name');
          itemName = item ? item.name : '';
        }
      } else if (favorite.category === 'album') {
        if (mongoose.Types.ObjectId.isValid(favorite.item_id)) {
          const item = await Album.findById(favorite.item_id).select('name');
          itemName = item ? item.name : '';
        }
      } else if (favorite.category === 'track') {
        if (mongoose.Types.ObjectId.isValid(favorite.item_id)) {
          const item = await Track.findById(favorite.item_id).select('name');
          itemName = item ? item.name : '';
        }
      }
      return {
        ...favorite._doc,
        itemName
      };
    }));

    res.status(200).json(createResponse(200, favoritesWithNames, "Favorites fetched successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to fetch favorites", err.message));
  }
};

// Create a new favorite
const createFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;

    // Validation for required fields
    if (!category || !item_id) {
      return res.status(400).json(createResponse(400, null, "All required fields must be provided"));
    }

    const newFavorite = new Favorite({
      category,
      item_id
    });
    await newFavorite.save();
    res.status(201).json(createResponse(201, newFavorite, "Favorite created successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to create favorite", err.message));
  }
};

// Delete a favorite by ID
const deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!favorite) {
      return res.status(404).json(createResponse(404, null, "Favorite not found"));
    }
    res.status(200).json(createResponse(200, null, "Favorite deleted successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to delete favorite", err.message));
  }
};

module.exports = {
  getFavoritesByCategory,
  createFavorite,
  deleteFavorite
};

