'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
//import * as auth from '../../auth/auth.service';

router.get('/', controller.index);
router.delete('/:id', controller.delete);
//router.put('/:id/password', controller.changePassword);
router.get('/:id', controller.show);
router.post('/', controller.create);

/*
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
*/

module.exports = router;
