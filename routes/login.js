var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('login');
  })

router.post('/', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router;