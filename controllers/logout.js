// Controller to logout the user

module.exports = (request, response) => {
  request.session.destroy();
  response.redirect('/');
};