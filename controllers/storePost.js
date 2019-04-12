// Controller to store new post in database

const Post = require('../database/models/Post');

module.exports = (request, response) => {
  // Create post
  Post.create({
    ...request.body,
    author: request.session.userID
  }, (error, post) => {
    // And redirect to new post page
    response.redirect('/post/' + post._id)
  });
};