const mongoose = require('mongoose');

const receipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    ingredients: String,
    directions: String,
    cookTime: String,
    numberOfServings: String,
    date: Date
});

module.exports = mongoose.model('Recipe', receipSchema);