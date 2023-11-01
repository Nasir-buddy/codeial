const Post = require('../models/post');
module.exports.home = async (req, res) => {
    // console.log("Cookies value : ", req.cookies);
    const posts = await Post.find({});

    // Render the home page with the posts
    res.render('home', {
        title: 'Codeial | Home',
        posts: posts,
    });
}
