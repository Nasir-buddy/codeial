const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
    try {
        // Fetch the posts and populate the "user" field
        const posts = await Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).exec();

        // Render the home page with the posts
        const users = await User.find({}).exec();
        res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_user: users
        });
        
    } catch (err) {
        console.error('Error in fetching and populating posts: ', err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

