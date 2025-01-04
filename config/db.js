const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoDbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = mongoDbConnection;
