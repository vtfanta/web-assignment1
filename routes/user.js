var express = require('express');
var router = express.Router();
// var User = require('../models/user');

router.get('/', (req, res) => {
  res.render('workouts', {user:req.user,workouts:req.user.workoutList});
})


router.get('/:workout_id/exercises', function(req, res, next) {
  var foundWorkout = req.user.workoutList.filter((workout => workout._id == req.params.workout_id));
  res.render('exercises',{user: req.user, workout: foundWorkout});
});

router.post(':workout_id/exercises', (req,res) => {
  var foundWorkout = req.user.workoutList.filter((workout => workout._id == req.params.workout_id));

})

module.exports = router;
