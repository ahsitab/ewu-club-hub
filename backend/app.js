const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('config');

// Force development environment
process.env.NODE_ENV = 'development';
console.log('Running in environment:', process.env.NODE_ENV);

// Connect to the database
connectDB();

// Verify config is loaded
console.log('Using MongoDB URI:', config.get('mongoURI'));

// Initialize the Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'EWU Club Hub API',
    status: 'running',
    routes: {
      auth: '/api/auth',
      clubs: '/api/clubs',
      events: '/api/events'
    }
  });
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clubs', require('./routes/clubs'));
app.use('/api/events', require('./routes/events'));

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    availableRoutes: ['/api/auth', '/api/clubs', '/api/events']
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Try accessing: http://localhost:${PORT}`);
});
