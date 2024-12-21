const express = require('express');
const router = express.Router();

const { isAdmin, isAdminOrEditor } = require("../config/auth");

const 
{
createArtist,
getArtists,
getArtistById,
updateArtist,
deleteArtist,
} = require ("../controller/artistController"); // Adjust the path as necessary

// Create a new artist
router.post('/add-artist',isAdmin ,createArtist);

// Get all
router.get('/', getArtists);

// Get an artist by ID
router.get('/:id', getArtistById);

// Update an artist by ID
router.put('/:id', isAdminOrEditor,updateArtist);

// Delete an artist by ID
router.delete('/:id', isAdminOrEditor,deleteArtist);

module.exports = router;
