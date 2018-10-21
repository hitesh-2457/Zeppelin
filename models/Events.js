const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    name: String,
    destn: String,
    dateTime: Date,
    duration: Number,
    state: String,
    city: Array
}, { timestamps: true });

const Events = mongoose.model('events', eventsSchema);

module.exports = Events;
