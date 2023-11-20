const Post = require('../models/post');
const user = require('../models/user');
const Comment = require('../models/comment');
const { post } = require('../routes');
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

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the use ris the owner of the post 
    if (post.user == req.user.id) {
      await post.deleteOne();

      // delete associated coments
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log("Error in deleting post", err);
    return res.status(500).json({ error: "Failed to delete post" });
  }
}
