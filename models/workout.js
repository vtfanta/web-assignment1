const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var exerciseSchema = require('./exercise');

var workout = new Schema({
    name: {
        type: String,
        required: true
    },
    exerciseList: [exerciseSchema]
})

module.exports = workout;