const express = require('express');
const router = express.Router();
const 
{
getArtists,
getArtistById,
} = require ("../controller/artistController"); // Adjust the path as necessary


// Get all
router.get('/', getArtists);

// Get an artist by ID
router.get('/:id', getArtistById);


module.exports = router;
