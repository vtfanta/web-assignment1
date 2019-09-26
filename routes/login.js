var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

router.post('/', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router;