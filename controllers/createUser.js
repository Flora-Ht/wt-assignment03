// Controller to display the register page

module.exports = (request, response) => {
  response.render('register', {
    // Get previous errors and data from flash
    errors: request.flash('registrationErrors'),
    data: request.flash('data')[0]
  });
}