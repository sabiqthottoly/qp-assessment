const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('../db/connection');

const app = express();
const port = process.env.PORT || 8081;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Handle 404 (Not Found) errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
