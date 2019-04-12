// Controller to display the login page

module.exports = (request, response) => {
  response.render('login', {
    // Get previous errors and data from flash
    errors: request.flash('loginErrors'),
    data: request.flash('data')[0]
  });
}