var express = require('express');
var controller = express.Router();

/* GET home page. */
controller.get('/eventSearch', function (req, res, next) {

    User.find({}, (err, events) => {
        if (err) { return next(err); }

        var eventMap = {};
        events.forEach(function (event) {
            eventMap[event._id] = event.eventName;
        });

        res.send(eventMap);
    });

});



module.exports = router;
