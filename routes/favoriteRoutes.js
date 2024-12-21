const express = require('express');
const router = express.Router();
const {
    createFavorite,
    getFavoritesByCategory,
    deleteFavorite
} = require('../controller/favoriteController'); // Adjust the path as necessary



// Fetch favorites by category with pagination
router.get('/:category', getFavoritesByCategory);

// Create a new favorite
router.post('/add-favorite', createFavorite);

// Delete a favorite by ID
router.delete('/remove-favorite/:id', deleteFavorite);

module.exports = router;
