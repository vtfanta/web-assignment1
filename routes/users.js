var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find({},(err,allUsers) => {
    if (err) {
      console.log(err);
    } else {
      res.render('users',{users:allUsers});
    }
  });
});

// GET list of user's workouts
router.get('/:user_id', (req,res,next) => {
  userModel.find({_id: req.params.user_id},(err,user) => {
    if (err) {
      console.log(err)
    } else {
      user = user[0];
      res.render('workouts',{user:user,workouts:user.workoutList});
    }
  });

  // GET breakout of a single workout (list of exercises)
  router.get('/:user_id/:workout_id', (req,res,next) => {
    userModel.find({_id: req.params.user_id},(err,foundUser) => {
      if (err) {
        console.log(err);
      } else {
        foundUser = foundUser[0];
        foundWorkout = foundUser.workoutList.filter(x => x._id == req.params.workout_id)[0];
        res.render('exercises',{workout:foundWorkout});
      }
    })
  })
  
})

module.exports = router;
