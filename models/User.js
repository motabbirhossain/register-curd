const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    trim: true
  },
  skill: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true,
    enum: ['male', 'female']
  }
});

module.exports = mongoose.model('User', UserSchema);