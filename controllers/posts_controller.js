const Post = require('../models/post');
const user = require('../models/user');
module.exports.create = async (req, res) => {
  try {
      const post = await Post.create({
          content: req.body.content,
          user: req.user._id
        });
        
        // console.log(req.user);
      return res.redirect('back');
  } catch (err) {
      console.log('Error in creating a post: ', err);
      return res.status(500).json({ error: 'Failed to create post' });
  }
};