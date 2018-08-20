const mongoose = require('mongoose');

const versionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipeId: String,
    prevVersions: '',
    dateUpdate: Date
});

module.exports = mongoose.model('Version', versionSchema);