const express = require('express');
const router = express.Router();
const { regstionUser, loginUser, logoutUser, logginUser } = require('../controllers/userController');

// Registration route
router.post('/register', regstionUser);

// Login route
router.post('/login', loginUser);

// Login Me Router
router.get('/me', logginUser);

// Logout route
router.post('/logout', logoutUser);

module.exports = router;
