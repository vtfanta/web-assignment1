const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var exercise = new Schema({
    repsOrTime: {
        type: Number,
        required: true
    },
    sets_n: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})



module.exports = exercise;