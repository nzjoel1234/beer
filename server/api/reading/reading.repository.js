'use strict';

var Reading = require('./reading.model');
var objectIdHelper = require('../../utils/objectIdHelper');

function getReading (id, callback) {
    Reading.findOne({ _id: objectIdHelper.toObjectId(id) })
        .exec()
        .then(function (reading) { callback(null, reading); })
        .catch(function (err) { callback(err.errmsg); });
}

function getReadings (callback) {
    Reading.find({})
        .exec()
        .then(function (readings) { callback(null, readings); })
        .catch(function (err) { callback(err.errmsg); });
}

function createReading (when, value, callback) {

    var reading = new Reading();
    reading.when = when;
    reading.value = value;

    reading.save()
        .then(function() { getReading(reading._id, callback); })
        .catch(function (err) { callback(err.errmsg); });
    
};

module.exports.createReading = createReading; 
module.exports.getReading = getReading;
module.exports.getReadings = getReadings;
