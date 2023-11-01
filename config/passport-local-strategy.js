const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../models/user');
// Authentication using passport 
// passport.use(new LocalStrategy({
//     usernameField: 'email'
//     },
//     function(email, password, done){
//         // find a user and establish the identity 
//         console.log("entering find one");
//         user.findOne({email: email}, function(err, user){
//             if(err){
//                 console.log(`Error in finding user ---> Passport ${err}`);
//                 return done(err);
//             }
//             if(!user || user.password !== password){
//                 console.log('Invalid user name and password');
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     }
// ));
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async function (email, password, done) {
    try {
      // Find a user and establish the identity 
      const authUser = await user.findOne({ email: email });
      if (!authUser || authUser.password !== password) {
        console.log('Invalid email or password');
        return done(null, false);
      }
      return done(null, authUser);
    } catch (err) {
      console.log(`Error in finding user ---> Passport ${err}`);
      return done(err);
    }
  }
));

// serializing the use to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     user.findById(id, function(err, user){
//         if(err){
//             console.log(`Error in finding user ---> Passport ${err}`);
//             return done(err); 
//         }
//         return done(null, user);
//     });
// });

passport.deserializeUser(async function (id, done) {
  try {
    const finalUser = await user.findById(id);
    if (!finalUser) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    console.log(`Error in finding user ---> Passport ${err}`);
    return done(err);
  }
});

// check if the user is authenticated 
passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in 
  return res.redirect('/users/sign-in');
}

// passport.setAuthenticatedUser = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     // req.user contains the current signed in user from the session cookie an dwe just sending this to the local for the views
//     res.locals.user = req.user;
//   }
//   next();
// }
passport.setAuthenticatedUser = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      // req.user contains the current signed-in user from the session cookie, and we're just sending this to the locals for the views
      res.locals.user = req.user;
    }
    next();
  } catch (error) {
    // Handle any potential errors here
    next(error);
  }
};
module.exports = passport;