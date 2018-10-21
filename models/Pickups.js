const mongoose = require('mongoose');

const pickupsSchema = new mongoose.Schema({
    city: String,
    pickUps: Array
}, { timestamps: true });

const PickUps = mongoose.model('pickups', pickupsSchema);

module.exports = PickUps;
