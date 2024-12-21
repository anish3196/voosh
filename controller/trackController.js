const Track = require('../models/Track');
const Album = require('../models/Album'); 
const Artist = require('../models/Artist');
const mongoose = require("mongoose");
const { createResponse } = require('../utils/response.util'); // Adjust the path as necessary

// Create a new track
const createTrack = async (req, res) => {
  try {
    const { name, duration, hidden, album_id, artist_id } = req.body;
    
    // Validation for required fields
    if (!name || !duration || !album_id || !artist_id) {
      return res.status(400).json(createResponse(400, null, "All required fields must be provided"));
    }

    const newTrack = new Track({
      name,
      duration,
      hidden,
      album_id,
      artist_id
    });
    await newTrack.save();
    res.status(201).json(createResponse(201, newTrack, "Track created successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to create track", err.message));
  }
};

// Get all tracks
const getTracks = async (req, res) => {
  try {
    const tracks = await Track.find();

    // Retrieve and add Album and Artist names
    const tracksWithNames = await Promise.all(tracks.map(async (track) => {
      let albumName = '';
      let artistName = '';

      if (mongoose.Types.ObjectId.isValid(track.album_id)) {
        const album = await Album.findById(track.album_id).select('name');
        albumName = album ? album.name : '';
      }

      if (mongoose.Types.ObjectId.isValid(track.artist_id)) {
        const artist = await Artist.findById(track.artist_id).select('name');
        artistName = artist ? artist.name : '';
      }

      return {
        ...track._doc,
        albumName,
        artistName
      };
    }));

    res.status(200).json(createResponse(200, tracksWithNames, "Tracks fetched successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to fetch tracks", err.message));
  }
};


// Get a track by ID
const getTrackById = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json(createResponse(404, null, "Track not found"));
    }

    let albumName = '';
    let artistName = '';

    if (mongoose.Types.ObjectId.isValid(track.album_id)) {
      const album = await Album.findById(track.album_id).select('name');
      albumName = album ? album.name : '';
    }

    if (mongoose.Types.ObjectId.isValid(track.artist_id)) {
      const artist = await Artist.findById(track.artist_id).select('name');
      artistName = artist ? artist.name : '';
    }

    const trackWithNames = {
      ...track._doc,
      albumName,
      artistName
    };

    res.status(200).json(createResponse(200, trackWithNames, "Track fetched successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to fetch track", err.message));
  }
};


// Update a track by ID
const updateTrack = async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTrack) {
      return res.status(404).json(createResponse(404, null, "Track not found"));
    }

    let albumName = '';
    let artistName = '';

    if (mongoose.Types.ObjectId.isValid(updatedTrack.album_id)) {
      const album = await Album.findById(updatedTrack.album_id).select('name');
      albumName = album ? album.name : '';
    }

    if (mongoose.Types.ObjectId.isValid(updatedTrack.artist_id)) {
      const artist = await Artist.findById(updatedTrack.artist_id).select('name');
      artistName = artist ? artist.name : '';
    }

    const updatedTrackWithNames = {
      ...updatedTrack._doc,
      albumName,
      artistName
    };

    res.status(200).json(createResponse(200, updatedTrackWithNames, "Track updated successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to update track", err.message));
  }
};


// Delete a track by ID
const deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) {
      return res.status(404).json(createResponse(404, null, "Track not found"));
    }
    res.status(200).json(createResponse(200, null, "Track deleted successfully!"));
  } catch (err) {
    res.status(500).json(createResponse(500, null, "Failed to delete track", err.message));
  }
};

module.exports = {
  createTrack,
  getTracks,
  getTrackById,
  updateTrack,
  deleteTrack
};
