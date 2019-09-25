const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var workoutSchema = require('./workout');

var User = new Schema( {
    // workout program list
    workoutList: [workoutSchema],
    // username
    username: {
        type: String,
        required: true
    },
    // password
    salt: {
        type: String,
    },
    hash: {
        type: String,
    }
})

module.exports = mongoose.model('user',User);