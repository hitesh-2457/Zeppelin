const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    name: { type: String },
    destn: { type: String },
    dateTime: { type: Date },
    duration: { type: Number },
    state: { type: String },
    city: { type: Array }
}, { timestamps: true });

const Events = mongoose.model('events', eventsSchema);

module.exports = Events;
