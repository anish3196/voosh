const express = require('express');
const router = express.Router();
const 
{
createArtist,
updateArtist,
deleteArtist,
} = require ("../controller/artistController"); // Adjust the path as necessary

// Create a new artist
router.post('/add-arists', createArtist);

// Update an artist by ID
router.put('/:id', updateArtist);

// Delete an artist by ID
router.delete('/:id', deleteArtist);

module.exports = router;
