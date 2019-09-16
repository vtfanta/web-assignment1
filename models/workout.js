const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var exerciseSchema = require('./exercise');

var workout = new Schema({
    exerciseList: [exerciseSchema]
})

module.exports = workout;