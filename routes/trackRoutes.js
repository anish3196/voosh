const express = require('express');
const router = express.Router();
const { isAdmin, isAdminOrEditor } = require("../config/auth");

const {
    createTrack,
    getTracks,
    getTrackById,
    updateTrack,
    deleteTrack
} = require("../controller/trackController"); // Adjust the path as necessary

// Create a new track
router.post('/add-track', isAdmin,createTrack);

// Get all tracks
router.get('/', getTracks);

// Get a track by ID
router.get('/:id', getTrackById);

// Update a track by ID
router.put('/:id', isAdminOrEditor,updateTrack);

// Delete a track by ID
router.delete('/:id', isAdminOrEditor,deleteTrack);

module.exports = router;
