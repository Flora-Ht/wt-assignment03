// Middleware to check the validity of a new post

module.exports = (request, response, next) => {
  if (!request.body.title) {
    return response.redirect('/create');
  }
  next();
};