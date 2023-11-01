const express = require('express');
const app = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

app.get('/profile',passport.checkAuthentication ,userController.profile);

app.get('/sign-up', userController.signUp);
app.get('/sign-in', userController.singIn);

app.post('/create', userController.create);
// use passport as a middleware to authenticate
app.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userController.createSession);

app.get('/sign-out', userController.destroySession);

module.exports = app;