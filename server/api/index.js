'use strict';

var express = require('express');
var router = express.Router();

router.use('/users', require('./user'));
router.use('/readings', require('./reading'));

module.exports = router;