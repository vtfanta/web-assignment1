var express = require('express');
var router = express.Router();
var User = require('../models/user');

var newUser = User({
  name: "John Doe",
  password: "1234",
  workoutList: [
    {exerciseList:[
      {
        repsOrTime: 60,
        sets_n: 1,
        name: "Planck",
        description: "Just do a planck duh"
      }
    ]}
  ]
})

/* GET home page. */
router.get('/', function(req, res, next) {
  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(newUser);
      console.log('Saved');
    }
  });
});

module.exports = router;
