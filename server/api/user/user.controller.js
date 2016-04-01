'use strict';

var User = require('./user.model');
var UserRepository = require('./user.repository');

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

/**
 * Creates a new user
 */
module.exports.create = function (req, res) {
  UserRepository.createUser(
      req.body.username,
      req.body.password,
      function(err, user) {
          if (err) {
              validationError(res)(err);
          } else {
              res.status(201).json(user);
          }
      }
  );
}

/**
 * Get list of users
 * restriction: 'admin'
 */
module.exports.index = function (req, res) {
    console.log('index');
    UserRepository.getUsers(function(err, users) {
        if (err) { handleError(res)(err); }
        else {
           res.status(200).json(users);
        }
    });
}

/**
 * Get a single user
 */
module.exports.show = function (req, res, next) {

    console.log('show: ' + req.params.id);
    
    UserRepository.getUser(req.params.id, function(err, user) {
        if (err) { handleError(res)(err); }
        else if (!user) { res.status(404).end(); }
        else { res.status(200).json(user); }
    });
}

/**
 * Deletes a user
 */
module.exports.delete = function (req, res) {
    UserRepository.deleteUser(req.params.id, function(err) {
        if (err) { handleError(res)(err); }
        else { res.status(204).end(); }
    });
}

/*
/**
 * Change a users password
 *
module.exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}
*/
