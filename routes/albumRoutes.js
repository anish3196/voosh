const express = require('express');
const router = express.Router();
const {
    createAlbum,
    updateAlbum,
    deleteAlbum,
} = require('../controller/albumController'); 

// Create a new album
router.post('/add-albums', createAlbum);


// Update an album by ID
router.put('/:id', updateAlbum);

// Delete an album by ID
router.delete('/:id', deleteAlbum);

module.exports = router;
