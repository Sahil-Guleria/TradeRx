const express = require('express');
const mongoose = require('mongoose');
const portfolioRoutes = require('./routes/portfolioRoutes');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Middleware
app.use(express.json());

// Routes
app.use('/portfolio', portfolioRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
