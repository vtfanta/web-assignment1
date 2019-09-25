const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const UserModel = require('../models/user');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = (username, password, done) => {
        getUserByUsername(username, (user) => {
            if (user == null) {
                console.log('USER NOT FOUND');
                return done(null, false, {message: 'No user of that name'});
            }
            if (user.hash == crypto.pbkdf2Sync(password, user.salt,30000,32,'sha512').toString('hex')) {
                console.log('SUCCESS');
                return done(null, user);
            } else {
                console.log('INCORRECT PASSWORD');
                return done(null, false, {message: 'Incorrect password'});
            }
        });
        

    }
    passport.use(new LocalStrategy({usernameField: 'username'},authenticateUser))

    passport.serializeUser((user, done) => {
        done(null,user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findOne({_id: id},(err, user) => {
            if (err) { console.log(err); }
            done(null,user);
        })
    });
}

module.exports = initialize;