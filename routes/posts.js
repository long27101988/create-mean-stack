var express = require('express');
var fs = require('fs');
const isAuthenticated = require('../middleware/isAuthenticated');
const dataPost = require('../data.json');
var router = express.Router();

/* GET users listing. */
router.get('/', isAuthenticated(), function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(dataPost);
});

module.exports = router;
