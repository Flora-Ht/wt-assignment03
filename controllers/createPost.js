// Controller to display the create post page

module.exports = (request, response) => {
  // Check if user is logged in
  if (request.session.userID) {
    return response.render('create');
  }
  // else redirect to login page
  response.redirect('/login');
};