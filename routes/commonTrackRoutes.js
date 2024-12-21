const express = require('express');
const router = express.Router();
const {
    getTracks,
    getTrackById,
} = require("../controller/trackController"); // Adjust the path as necessary


// Get all tracks
router.get('/', getTracks);

// Get a track by ID
router.get('/:id', getTrackById);


module.exports = router;
