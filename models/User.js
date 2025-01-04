import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name : {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
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
  },
  location: {
    type: String,
    trim: true,
  },
  gallery: {
    type: Array,
    trim: true
  },
  accessToken: {
    type: String,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('User', UserSchema);