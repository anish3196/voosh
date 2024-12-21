const express = require('express');
const router = express.Router();

const { isAdmin, isAdminOrEditor } = require("../config/auth");

const {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
} = require('../controller/albumController'); 

// Create a new album
router.post('/add-album', isAdmin,createAlbum);

// Get all albums
router.get('/', getAlbums);

// Get an album by ID
router.get('/:id', getAlbumById);

// Update an album by ID
router.put('/:id', isAdminOrEditor,updateAlbum);

// Delete an album by ID
router.delete('/:id', isAdminOrEditor,deleteAlbum);

module.exports = router;
