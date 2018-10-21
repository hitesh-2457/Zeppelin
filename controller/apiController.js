exports.eventSearchApi = function (req, res, next) {

    var filter = {};
    if (req.body.search)
        filter = { name: '\/req.body.search\/i' };

    User.find(filter, (err, events) => {
        if (err) { return next(err); }

        var eventMap = {};
        events.forEach(function (event) {
            eventMap[event._id] = event;
        });

        res.send(eventMap);
    });

};