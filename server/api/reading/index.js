'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./reading.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;
