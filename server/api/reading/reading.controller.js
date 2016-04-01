'use strict';

var ReadingRepository = require('./reading.repository');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json({ error: err });
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send({ error: err });
  };
}

module.exports.create = function (req, res) {
  ReadingRepository.createReading(
      req.body.when,
      req.body.value,
      function(err, reading) {
          if (err) {
              validationError(res)(err);
          } else {
              res.status(201).json(reading);
          }
      }
  );
}

module.exports.index = function (req, res) {
    console.log('index');
    ReadingRepository.getReadings(function(err, readings) {
        if (err) { handleError(res)(err); }
        else {
           res.status(200).json(readings);
        }
    });
}

module.exports.show = function (req, res, next) {

    console.log('show: ' + req.params.id);
    
    ReadingRepository.getReading(req.params.id, function(err, reading) {
        if (err) { handleError(res)(err); }
        else if (!reading) { res.status(404).end(); }
        else { res.status(200).json(reading); }
    });
}
