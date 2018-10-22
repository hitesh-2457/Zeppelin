var Events = require('../models/Events');
var Bookings = require("../models/Booking");
exports.eventSearchApi = function (req, res, next) {
    var searchString = req.query.string;

    Events.find({}, (err, events) => {
        if (err) { return next(err); }

        var eventMap = [];
        events.forEach(function (event) {
            if (event.name.includes(searchString))
                eventMap.push(event);
        });

        Bookings.find({}, (err, bookings) => {
            if (err) { return next(err); }

            var count = 0;
            bookings.forEach(function (booking) {
                if (booking.eventId == eventMap[0]._id)
                    count += 1;
            });
            res.send({ items: eventMap, bookingCount: count });
        });
    });

};

exports.listEventsApi = function (req, res, next) {
    var searchString = req.query.string;
    var filter = {};
    if (req.body.search)
        filter = { name: '\/searchString\/i' };

    Events.find(filter, (err, events) => {
        if (err) { return next(err); }

        var eventMap = [];
        events.forEach(function (event) {
            eventMap.push(event.name);
        });

        res.send({ items: eventMap });
    });
};