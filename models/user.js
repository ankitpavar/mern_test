const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: 'String',
      required: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    lastName: {
      type: 'String',
      required: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: 'String',
      required: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    dob: {
      type: 'String',
      required: true,
    },
    bio: {
      type: 'String',
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;