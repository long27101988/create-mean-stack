var express = require('express');
var fs = require('fs');
const isAuthenticated = require('../middleware/isAuthenticated');
var router = express.Router();

/* GET users listing. */
router.get('/', isAuthenticated(), function(req, res, next) {
    Article.find({}).then( articles => {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(articles);
    })
    .catch(error => {
        return res.status(400).json({
            error: {
                messsage: error.message
            } 
        })
    })
});


router.get('/:id', isAuthenticated(), function (req, res, next) {
    Article.findOne({_id: req.params.id}).then(article => {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(article)
    })
    .catch(error => {
        return res.status(400).json({
            error: {
                message: error.message
            }
        })
    })
});

module.exports = router;
