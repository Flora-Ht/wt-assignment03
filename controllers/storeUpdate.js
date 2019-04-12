// Controller to store the update of a post in the database

const Post = require('../database/models/Post');

module.exports = (request, response) => {
  // Find the post with the id and update with the new content
  Post.findByIdAndUpdate(request.body.postID, {
    ...request.body,
    updatedAt: Date.now()
  }, (error, post) => {
    // Redirect to the updated post page
    response.redirect('/post/' + request.body.postID);
  });
};