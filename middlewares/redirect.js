// Middleware to check if user is logged in

module.exports = (request, response, next) => {
  if (request.session.userID) {
    return response.redirect('/');
  }
  next();
};