const mongoose = require('mongoose');

const pickupsSchema = new mongoose.Schema({
    city: { type: String },
    pickUps: { type: Array }
}, { timestamps: true });

const PickUps = mongoose.model('pickups', pickupsSchema);

module.exports = PickUps;
