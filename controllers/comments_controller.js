const comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post).exec();
    //    console.log(req.body)
        if (post) {
            const data = await comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // Handle error if needed
            console.log(data)
            post.comments.push(data);
            await post.save();
            res.redirect('/');
        }
    } catch (err) {
        // Handle errors appropriately
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
