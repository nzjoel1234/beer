'use strict';

var mongoose = require('mongoose');
var User = require('./user.model');
var bcrypt = require('bcrypt-nodejs');
var objectIdHelper = require('../../utils/objectIdHelper');

function _hashPassword(password, callback) {
    bcrypt.genSalt(5, function (err, salt) {
        if (err) { callback(err); }
        bcrypt.hash(password, salt, null, callback);
    });
}

function getUser (id, callback) {
    User.findOne({ _id: objectIdHelper.toObjectId(id) }, '-passwordHash')
        .exec()
        .then(function (user) { callback(null, user); })
        .catch(function (err) { callback(err); });
}

function getUsers (callback) {
    User.find({}, '-passwordHash')
        .exec()
        .then(function (users) { callback(null, users); })
        .catch(function (err) { callback(err); });
}

function createUser (username, password, callback) {
    _hashPassword(password, function (err, passwordHash) {
        if (err) { callback(err); }
        
        var user = new User();
        user.username = username;
        user.passwordHash = passwordHash;
        
        user.save()
            .then(function() { getUser(user._id, callback); })
            .catch(function (err) { callback(err); });
    });
};

function deleteUser (id, callback) {
    User.findByIdAndRemove(objectIdHelper.toObjectId(id)).exec()
        .then(function() { callback(); })
        .catch(function (error) { callback(error) });
}

/*
UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.passwordHash, function(err, isMatch) {
    if (err) return callback(err);
    cb(null, isMatch);
  });
};
*/


module.exports.createUser = createUser; 
module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
