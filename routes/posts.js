var express = require('express');
var fs = require('fs');
const isAuthenticated = require('../middleware/isAuthenticated');
const dataPost = require('../data.json');
var router = express.Router();

/* GET users listing. */
router.get('/', isAuthenticated(), function(req, res, next) {
    return res.status(200).json(dataPost);
});


router.get('/:id', isAuthenticated(), function (req, res, next) {
    let postById = dataPost.find(post => {
        return post._id === req.params.id
    })
    return res.status(200).json(postById)
});

module.exports = router;
