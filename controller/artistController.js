const Artist = require('../models/Artist'); 
const { createResponse } = require('../utils/response.util'); 

// Create a new artist
const createArtist = async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;

    if (!name || !grammy || !hidden) {
        return res.status(400).json(createResponse(400, null, "All required fields must be provided"));
      }
    const newArtist = new Artist({
      name,
      grammy,
      hidden
    });
    await newArtist.save();
    res.status(201).json(createResponse(201, newArtist, "Artist created successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to create artist", err.message));
  }
};

// Get all artists
const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(createResponse(200, artists, "Artists fetched successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to fetch artists", err.message));
  }
};

// Get an artist by ID
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json(createResponse(404, null, "Artist not found"));
    }
    res.status(200).json(createResponse(200, artist, "Artist fetched successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to fetch artist", err.message));
  }
};

// Update an artist by ID
const updateArtist = async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      { name, grammy, hidden },
      { new: true, runValidators: true }
    );
    if (!updatedArtist) {
      return res.status(404).json(createResponse(404, null, "Artist not found"));
    }
    res.status(200).json(createResponse(200, updatedArtist, "Artist updated successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to update artist", err.message));
  }
};

// Delete an artist by ID
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json(createResponse(404, null, "Artist not found"));
    }
    res.status(200).json(createResponse(200, null, "Artist deleted successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to delete artist", err.message));
  }
};

module.exports = {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist
};
