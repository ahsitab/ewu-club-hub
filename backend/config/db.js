const mongoose = require('mongoose');
const developmentConfig = require('../config/development.json');

const connectDB = async () => {
  try {
    const mongoURI = developmentConfig.mongoURI;
    console.log('Connecting to MongoDB Atlas at:', mongoURI.replace(/:[^@]*@/, ':*****@'));
    await mongoose.connect(mongoURI, {
      tls: true,
      tlsAllowInvalidCertificates: true,  // Allow invalid certificates for debugging
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
