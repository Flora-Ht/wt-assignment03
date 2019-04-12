// Controller to delete a Post

const Post = require('../database/models/Post');

module.exports = (request, response) => {
  Post.findByIdAndDelete(request.body.postID, (error, post) => {
    return response.redirect('/');
  });
  
}