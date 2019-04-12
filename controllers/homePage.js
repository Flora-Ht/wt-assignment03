// Controller to display the home page

const Post = require('../database/models/Post');

module.exports = async (request, response) => {
  // Find last ten posts and sort by most recent first
  const posts = await Post.find({}).sort('-updatedAt').limit(10).populate('author');
  response.render('index', {
    posts
  });
};