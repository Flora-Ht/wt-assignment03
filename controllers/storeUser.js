// Controller to store the user in the database

const User = require('../database/models/User');

module.exports = (request, response) => {
  User.create(request.body, (error, user) => {
    // If error
    if (error) {
      // Store errors and redirect to the register page
      const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
      request.flash('registrationErrors', registrationErrors);
      request.flash('data', request.body);
      return response.redirect('/register');
    }
    // Else redirect to home page
    response.redirect('/');
  })
};