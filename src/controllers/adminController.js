const groceryQueries = require('../queries/groceryQueries');

// Admin controller functions

exports.addGroceryItem = async (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await groceryQueries.addGroceryItem(name, price, quantity);
    res.status(201).json({ message: 'Grocery item added successfully', itemId: result.insertId });
  } catch (error) {
    console.error('Error adding grocery item: ' + error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.viewGroceryItems = async (req, res) => {
  try {
    const results = await groceryQueries.viewGroceryItems();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching grocery items: ' + error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.removeGroceryItem = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await groceryQueries.removeGroceryItem(itemId);
    res.status(201).json({ message: 'Grocery item deleted successfully' });
  } catch (error) {
    console.error('Error removing grocery item: ' + error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateGroceryItem = async (req, res) => {
  const itemId = req.params.itemId;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await groceryQueries.updateGroceryItem(itemId, name, price);
    res.status(200).json({ message: 'Grocery item updated successfully' });
  } catch (error) {
    console.error('Error updating grocery item: ' + error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.manageInventory = async (req, res) => {
  const itemId = req.params.itemId;
  const { action, quantity } = req.body;

  if (!action || !quantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await groceryQueries.manageInventory(itemId, action, quantity);
    res.status(200).json({ message: 'Inventory managed successfully' });
  } catch (error) {
    console.error('Error managing inventory: ' + error.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
