var express = require('express');
var router = express.Router();
var User = require('../models/user');
var allExercises = require('../exercises');

router.get('/', (req, res) => {
  res.render('workouts', {user:req.user,workouts:req.user.workoutList});
})

router.post('/', (req,res) => {
  var list = req.user.workoutList;
  list.push({
    name: req.body.workout,
    exerciseList: []
  });
  User.findByIdAndUpdate(req.user._id, {workoutList: list},{new:true}, (err,updatedUser) => {
    if (err) { console.log(err);}
    console.log(updatedUser);
    res.render('workouts', {user:req.user,workouts:updatedUser.workoutList});
  })
})


router.get('/:workout_id/exercises', function(req, res, next) {
  var foundWorkout = req.user.workoutList.filter(workout => workout._id == req.params.workout_id)[0];
  console.log(foundWorkout.exerciseList);
  res.render('exercises',{user: req.user, workout: foundWorkout, availableExercises: allExercises});
});

router.post('/:workout_id/exercises', (req,res) => {
  var chosenExercise = allExercises.filter(exercise => exercise.name == req.body.addedExercise)[0];
  var workouts = req.user.workoutList;
  workouts.filter(workout => workout._id == req.params.workout_id)[0].exerciseList.push(chosenExercise);
  User.findByIdAndUpdate(req.user._id, {workoutList: workouts},{new:true}, (err,updatedUser) => {
    if (err) { console.log(err);}
    console.log(updatedUser);
    res.render('exercises', {availableExercises: allExercises,user:req.user,workout:updatedUser.workoutList.filter(workout => workout._id == req.params.workout_id)[0]});
  });
  
})

module.exports = router;
