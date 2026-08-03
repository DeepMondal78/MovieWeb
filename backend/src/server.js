const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Import Movie Routes
const movieRoutes = require('./routes/movieRoutes');

// Use Routes
app.use('/api/movies', movieRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Movie WebApp API is running...');
});

// MongoDB Connection & Server Start
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/moviewebapp')
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });