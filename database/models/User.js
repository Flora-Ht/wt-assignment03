// Model for a User in the database

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide an username']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  // Encrypt password before saving User
  bcrypt.hash(user.password, 10, function(error, encryptedPassword) {
    user.password = encryptedPassword;
    next();
  });
})

module.exports = mongoose.model('User', UserSchema);