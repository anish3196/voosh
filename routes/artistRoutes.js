const express = require('express');
const router = express.Router();
const 
{
createArtist,
getArtists,
getArtistById,
updateArtist,
deleteArtist,
} = require ("../controller/artistController"); // Adjust the path as necessary

// Create a new artist
router.post('/add-arists', createArtist);

// Get all
router.get('/', getArtists);

// Get an artist by ID
router.get('/:id', getArtistById);

// Update an artist by ID
router.put('/:id', updateArtist);

// Delete an artist by ID
router.delete('/:id', deleteArtist);

module.exports = router;
