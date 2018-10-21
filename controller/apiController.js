var Events = require('../models/Events');
exports.eventSearchApi = function (req, res, next) {
    var searchString = req.query.string;
    var filter = {};
    if (req.body.search)
        filter = { name: '\/searchString\/i' };

    Events.find(filter, (err, events) => {
        if (err) { return next(err); }

        var eventMap = [];
        events.forEach(function (event) {
            eventMap.push(event);
        });

        res.send({items:eventMap});
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

        res.send({items:eventMap});
    });
};