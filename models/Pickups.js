const mongoose = require('mongoose');

const pickupsSchema = new mongoose.Schema({
    city: String,
    pickUps: Array
}, { timestamps: true });

const PickUps = mongoose.model('pickUps', pickupsSchema);

module.exports = PickUps;
