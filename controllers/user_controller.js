const User = require('../models/user')

module.exports.profile = async (req, res) => {
    // console.log('req user' ,req.user);
    const user = await User.findById(req.params.id, function (err, user) {
        return res.render('users_profile', {
            title: "Entered in users directory",
            profile_user: user
        });
    });
    // console.log("user controller ",req.user.name)  
}

//render the sign up page 
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.singIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create = async (req, res) => {
    console.log("enter singup")
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('/users/sign-in');
    }
    console.log("exit route")

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        console.log(existingUser)
        if (!existingUser) {
            console.log("create user")
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error("Error in finding/creating user while signing up", err);
        return res.redirect('back');
    }
};


// sign in and get the create session 
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout(function (err) {
        req.flash('success', 'You have logged out');
        if (err) {
            // Handle the error
            return;
        }

        // The logout operation was successful
        res.redirect('/');
    });
};