import express from 'express';
const router = express.Router();
import {
  regstionPage,
  loginPage,
  logoutPage,
  ProfilePage,
  regstionUser,
  loginUser
} from '../controllers/userController.js';

// Profile Page Route
router.get('/', ProfilePage);

// Registration Route
router.get('/register', regstionPage);
router.post('/register', regstionUser);

// Login Route
router.get('/login', loginPage);
router.post('/login', loginUser);

// Logout Route
router.get('/logout', logoutPage);

export default router;

