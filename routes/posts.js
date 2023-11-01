const express = require('express');
const app = express.Router();
const passport = require('passport');
const postsController = require('../controllers/posts_controller');

app.post('/create', passport.checkAuthentication, postsController.create);

module.exports = app;