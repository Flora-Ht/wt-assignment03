// Controller to login the user

const User = require('../database/models/User');
const bcrypt = require('bcrypt');

module.exports = (request, response) => {
  const { email, password } = request.body;

  // If no email, redirect to the login page with errors
  if (!email) {
    const loginErrors = "Please enter your email";
    request.flash('loginErrors', loginErrors);
    request.flash('data', request.body);
    return response.redirect('/login');
  }

  User.findOne({ email }, (error, user) => {
    // If a user has been found with email
    if (user) {
      // Check if password matches with database
      bcrypt.compare(password, user.password, (error, result) => {
        // If yes
        if (result) {
          // Store session and redirect to home page
          request.session.userID = user._id;
          response.redirect('/');
        // if not
        } else {
          // Store errors and redirect to login page
          const loginErrors = "Email and password do not match";
          request.flash('loginErrors', loginErrors);
          request.flash('data', request.body);
          return response.redirect('/login');
        }
      })
    // If not
    } else {
      // Store errors and redirect to login page
      const loginErrors = "Email do not exist";
      request.flash('loginErrors', loginErrors);
      return response.redirect('/login');
    }
  });
};