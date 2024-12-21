const express = require('express');
const router = express.Router();
const {
    getAlbums,
    getAlbumById,
} = require('../controller/albumController'); 



// Get all albums
router.get('/', getAlbums);

// Get an album by ID
router.get('/:id', getAlbumById);


module.exports = router;
