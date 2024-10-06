// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utilities/dbConnection');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174', // Update this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allows credentials to be sent
}));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
