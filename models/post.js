const mongoose = require('mongoose');

const postScheema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the aray of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
}, { timestamps: true });

const Post = mongoose.model('Post', postScheema);
module.exports = Post;