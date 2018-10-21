var Events = require('../models/Events');
exports.eventSearchApi = function (req, res, next) {

    var filter = {};
    if (req.body.search)
        filter = { name: '\/req.body.search\/i' };

    Events.find(filter, (err, events) => {
        if (err) { return next(err); }

        var eventMap = [];
        events.forEach(function (event) {
            eventMap.push(event);
        });

        res.send({items:eventMap});
    });

};