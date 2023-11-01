const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// importing the express layouts in the project
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(__dirname + '/assets'));

app.use(expressLayouts);

//extract stryle and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');
// mongo store is used to store teh session cookie in the db 
app.use(session({
    name: 'codeial',
    //......
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 10 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nasir-ali:KNzAB6wNi6oSGZMs@cluster1.ktk27nx.mongodb.net/'
    },
        function(err) {
            if (err) {
                console.log(err || 'connected to the db');
            }
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes'));

// resuming learning
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running successfully on port: ${port}`);
})
