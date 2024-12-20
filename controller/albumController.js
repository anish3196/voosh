const Album = require('../models/Album');
const Artist = require('../models/Artist'); 
const { createResponse } = require('../utils/response.util'); 

// Create a new album
const createAlbum = async (req, res) => {
  try {
    const { name, year, hidden, artist_id } = req.body;

    // Validation for required fields
    if (!name || !year || !artist_id) {
      return res.status(400).json(createResponse(400, null, "All required fields must be provided"));
    }

    const newAlbum = new Album({
      name,
      year,
      hidden,
      artist_id
    });
    await newAlbum.save();
    res.status(201).json(createResponse(201, newAlbum, "Album created successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to create album", err.message));
  }
};

// Get all albums
const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();

    // Retrieve and add Artist names
    const albumsWithArtistNames = await Promise.all(albums.map(async (album) => {
      const artist = await Artist.findById(album.artist_id).select('name');
      return {
        ...album._doc,
        artistName: artist ? artist.name : null
      };
    }));

    res.status(200).json(createResponse(200, albumsWithArtistNames, "Albums fetched successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to fetch albums", err.message));
  }
};

// Get an album by ID
const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json(createResponse(404, null, "Album not found"));
    }

    // Retrieve and add Artist name
    const artist = await Artist.findById(album.artist_id).select('name');
    const albumWithArtistName = {
      ...album._doc,
      artistName: artist ? artist.name : null
    };

    res.status(200).json(createResponse(200, albumWithArtistName, "Album fetched successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to fetch album", err.message));
  }
};

// Update an album by ID
const updateAlbum = async (req, res) => {
  try {
    const { name, year, hidden, artist_id } = req.body;

    // Validation for required fields
    if (!name || !year || !artist_id) {
      return res.status(400).json(createResponse(400, null, "All required fields must be provided"));
    }

    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      { name, year, hidden, artist_id },
      { new: true, runValidators: true }
    );
    if (!updatedAlbum) {
      return res.status(404).json(createResponse(404, null, "Album not found"));
    }

    // Retrieve and add Artist name
    const artist = await Artist.findById(updatedAlbum.artist_id).select('name');
    const updatedAlbumWithArtistName = {
      ...updatedAlbum._doc,
      artistName: artist ? artist.name : null
    };

    res.status(200).json(createResponse(200, updatedAlbumWithArtistName, "Album updated successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to update album", err.message));
  }
};

// Delete an album by ID
const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json(createResponse(404, null, "Album not found"));
    }
    res.status(200).json(createResponse(200, null, "Album deleted successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to delete album", err.message));
  }
};

module.exports = {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum
};
