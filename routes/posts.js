const express = require('express');
const app = express.Router();

const postsController = require('../controllers/posts_controller');

app.post('/create', postsController.create);

module.exports = app;