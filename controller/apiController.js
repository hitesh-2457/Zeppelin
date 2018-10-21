var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/eventSearch', function (req, res, next) {

    User.find({}, (err, events) => {
        if (err) { return next(err); }

        var eventMap = {};
        events.forEach(function (event) {
            eventMap[event._id] = event;
        });

        res.send(eventMap);
    });

});

module.exports = router;
