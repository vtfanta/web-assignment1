const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var workoutSchema = require('./workout');

var User = new Schema( {
    // workout program list
    workoutList: [workoutSchema],
    // username
    name: {
        type: String,
        required: true
    },
    // password
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user',User);