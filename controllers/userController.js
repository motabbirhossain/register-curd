const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Register a new user
 * version: 1.0.0
 */
const regstionUser = async (req, res) => {

  const { name, username, email, password} = req.body;

  //Check if all required fields are provided
  if (!username || !email || !password || !name) {
    return res.status(400).json({
      message: "Username, email, name and password are required",
    });
  }

  try {
    // Check if salt is generated correctly
    const salt = bcrypt.genSaltSync(10);

    // Hash the password with the salt
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the user in the database
    await User.create({
      name,
      username,
      email,
      password: hashedPassword
    });

    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

/**
 * Login user
 * version: 1.0.0
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({
            msg: 'Error generating token'
          });
        }

        res .status(200) .cookie('token', token) .json({
          msg: 'Login successful',
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


/**
 * LoggInUser
 * version: 1.0.0
 */
const logginUser = async (req, res) => {
  try {

    const token = req.cookies.token;
     if (!token){
       return res.status(400).json({ msg: 'Invalid User' });
     }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify){
      const user = await User.findById(verify.user.id).select('-password')

      // Respond with user details
      return res.status(200).json({ user });
    }
  }catch (error){
    res.state(400).json({
      error: error.message
    })
  }
};

/**
 * Logout user
 * version: 1.0.0
 */
const logoutUser = (req, res) => {
  // Your logout logic here
  res.send('User logged out');
};

module.exports = {
  loginUser,
  logoutUser,
  regstionUser,
  logginUser
};
