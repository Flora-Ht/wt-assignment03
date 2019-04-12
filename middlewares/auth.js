// Middleware to check if the user exists

const User = require('../database/models/User');

module.exports = (request, response, next) => {
  User.findById(request.session.userID, (error, user) => {
    if (error || !user) {
      return response.redirect('/login');
    }

    next();
  });
};