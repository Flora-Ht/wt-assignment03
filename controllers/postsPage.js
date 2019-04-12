// Controller to display the all posts page

const Post = require('../database/models/Post');

module.exports = async (request, response) => {
  // Find all posts and sort by most recent first
  const posts = await Post.find({}).sort('-updatedAt').populate('author');
  response.render('posts', {
    posts
  });
};