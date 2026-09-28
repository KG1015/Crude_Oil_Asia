require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & middleware
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/asian_crude_battleground';

if (process.env.NODE_ENV === 'production' && process.env.MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log(' Connected to MongoDB Atlas'))
    .catch(err => console.error(' MongoDB Connection Error:', err));
} else {
  console.log('ℹ Running in standalone/local mode with in-memory calculation engines.');
}

// API Routes
app.use('/api/v1', apiRoutes);

// Root index
app.get('/', (req, res) => {
  res.json({
    project: 'Asian Crude Battleground API',
    description: 'Commercial Sourcing & Arbitrage Engine for China, India, Japan & South Korea',
    version: '1.0.0',
    documentation: '/api/v1/health'
  });
});

app.listen(PORT, () => {
  console.log(` Asian Crude Trading Desk API running on port ${PORT}`);
});
