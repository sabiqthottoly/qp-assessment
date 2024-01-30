const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// User endpoints
router.get('/grocery-items', userController.viewAvailableGroceryItems);
router.post('/place-order', userController.bookGroceryItems);

module.exports = router;
