const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: String },
    source: { type: String },
    isRoundTrip: { type: Boolean },
    eventId: { type: String },
    pickTime: { type: Date },
    duration: { type: Number }
}, { timestamps: true });

const Bookings = mongoose.model('bookings', bookingSchema);

module.exports = Bookings;
