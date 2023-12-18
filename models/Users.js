const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please input your username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please input a password'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps }
);

module.exports = mongoose.model('user', userSchema);
