const db = require('../db/connection');

// Promisified query function
const queryPromise = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Grocery queries

exports.addGroceryItem = (name, price, quantity) => {
  const query = 'INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)';
  return queryPromise(query, [name, price, quantity]);
};

exports.viewGroceryItems = () => {
  const query = 'SELECT * FROM grocery_items WHERE active = true';
  return queryPromise(query, []);
};

exports.removeGroceryItem = (itemId) => {
  const query = 'UPDATE grocery_items SET active = false WHERE id = ?';
  return queryPromise(query, [itemId]);
};

exports.updateGroceryItem = (itemId, name, price) => {
  const query = 'UPDATE grocery_items SET name = ?, price = ? WHERE id = ? AND active = true';
  return queryPromise(query, [name, price, itemId]);
};

exports.placeOrder = async (userId, items) => {
    try {
        // Step 1: Create a new order
        const orderQuery = 'INSERT INTO orders (user_id) VALUES (?)';
        const orderResult = await queryPromise(orderQuery, [userId]);
        const orderId = orderResult.insertId;
    
        // Step 2: Insert items into the order_items table
        const itemInsertPromises = items.map(async (item) => {
          const { groceryItemId, quantity } = item;
          const orderItemQuery = 'INSERT INTO order_items (order_id, grocery_item_id, quantity) VALUES (?, ?, ?)';
          await queryPromise(orderItemQuery, [orderId, groceryItemId, quantity]);
        });
    
        await Promise.all(itemInsertPromises);
    
        // Step 3: Update inventory (decrease quantity for each item in the order)
        const inventoryUpdatePromises = items.map(async (item) => {
          const { groceryItemId, quantity } = item;
          const updateQuery = 'UPDATE grocery_items SET quantity = quantity - ? WHERE id = ? AND active = true';
          await queryPromise(updateQuery, [quantity, groceryItemId]);
        });
    
        await Promise.all(inventoryUpdatePromises);
    
        // Step 4: Commit the transaction
        await db.commit();
      } catch (error) {
        // Step 5: Rollback the transaction in case of an error
        await db.rollback();
        throw error;
      }
  };
  
exports.manageInventory = (itemId, action, quantity) => {
  const updateQuery = action === 'increase' ? 'quantity = quantity + ?' : 'quantity = quantity - ?';
  const query = `UPDATE grocery_items SET ${updateQuery} WHERE id = ? AND active = true`;
  return queryPromise(query, [quantity, itemId]);
};
