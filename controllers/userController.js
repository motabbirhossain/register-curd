import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import path from 'path';
import { hashPassword } from '../utility/hash.js';
import { validate } from '../utility/validate.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Register user
 * version: 1.0.0
 */
export const regstionPage = async (req, res) => {
  res.render('register');
};

/**
 * Register a new user
 * version: 1.0.0
 */
export const regstionUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check for missing fields
    if (!name || !email || !password) {
      validate('All fields are required', '/register', req, res);
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({ name, email, password: hashedPassword });
      validate('User registered successfully', '/login', req, res);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    validate('User registration failed', '/register', req, res);
  }
};

/**
 * Login user
 * version: 1.0.0
 */
export const loginPage = async (req, res) => {
  res.render('login');
};

/**
 * Login user
 * version: 1.0.0
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      validate('All fields are required', '/login', req, res);
    } else {
      const loginUser = await User.find().where('email').equals(email);
      if (!loginUser[0]) {
        validate('User Not Found', '/login', req, res);
      } else {
        const userPass = bcrypt.compareSync(password, loginUser[0].password);
        console.log(userPass);
        if (!userPass) {
          validate('Wrong Password', '/login', req, res);
        } else {
          req.session.user = loginUser[0]
          validate('Login Successfully', '/', req, res);
        }
      }
    }
  } catch (error) { 
    console.error('Error during registration:', error); 
    validate('User registration failed', '/login', req, res);
  }
};


/**
 * LoggInUser
 * version: 1.0.0
 */
export const ProfilePage = async (req, res) => {
  res.render('profile');
};

/**
 * Logout user
 * version: 1.0.0
 */

export const logoutPage = (req, res) => {
  req.session.user = null;
  validate('Loge Out Successfully', '/register', req, res);
};
