
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strat
        callbackURL:"/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshTocken, profile, done) => {
        // passport callback function
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) {
                // user has already logged in before
                done(null, currentUser);
            } else {
                // create user in db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);