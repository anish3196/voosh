const express = require('express');
const router = express.Router();
const {
    createTrack,
    getTracks,
    getTrackById,
    updateTrack,
    deleteTrack
} = require("../controller/trackController"); // Adjust the path as necessary

// Create a new track
router.post('/add-tracks', createTrack);

// Get all tracks
router.get('/', getTracks);

// Get a track by ID
router.get('/:id', getTrackById);

// Update a track by ID
router.put('/:id', updateTrack);

// Delete a track by ID
router.delete('/:id', deleteTrack);

module.exports = router;
