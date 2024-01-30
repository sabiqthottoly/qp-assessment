const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Admin endpoints
router.post('/grocery-items', adminController.addGroceryItem);
router.get('/grocery-items', adminController.viewGroceryItems);
router.delete('/grocery-items/:itemId', adminController.removeGroceryItem);
router.put('/grocery-items/:itemId', adminController.updateGroceryItem);
router.patch('/grocery-items/:itemId/manage-inventory', adminController.manageInventory);

module.exports = router;
