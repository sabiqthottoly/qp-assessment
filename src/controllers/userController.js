const groceryQueries = require('../queries/groceryQueries');

// User controller functions

/**
 * View available grocery items.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.viewAvailableGroceryItems = async (req, res) => {
  try {
    const results = await groceryQueries.viewGroceryItems();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching grocery items: ' + error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Book multiple grocery items in a single order.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.bookGroceryItems = async (req, res) => {
    
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing user ID or order items' });
    }
  
    try {
      await groceryQueries.placeOrder(userId, items);
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order: ' + error.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
