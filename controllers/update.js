// Controller to display the update post page

const Post = require('../database/models/Post');

module.exports = async (request, response) => {
  const post = await Post.findById(request.params.id);
  response.render('update', {
    post
  });
};