const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: String,
    source: String,
    isRoundTrip: Boolean,
    eventId: String,
    pickTime: Date,
    duration: Number
}, { timestamps: true });

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;
