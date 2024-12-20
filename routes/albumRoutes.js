const express = require('express');
const router = express.Router();
const {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
} = require('../controller/albumController'); 

// Create a new album
router.post('/add-albums', createAlbum);

// Get all albums
router.get('/', getAlbums);

// Get an album by ID
router.get('/:id', getAlbumById);

// Update an album by ID
router.put('/:id', updateAlbum);

// Delete an album by ID
router.delete('/:id', deleteAlbum);

module.exports = router;
