const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const mongoDbConnection = require('./config/db');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoute);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, '127.0.0.1', () => {
  mongoDbConnection();
  console.log(`Server is running on port ${PORT}`);
});
