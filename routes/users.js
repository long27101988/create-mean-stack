var express = require('express');
var passport = require('passport')

const jwt = require('jsonwebtoken');
const config = require('../config');
const isAuthenticated = require('../middleware/isAuthenticated');
var router = express.Router();

/* GET users listing. */

router.get('/current', isAuthenticated(), function (req, res) {
  return res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  })
})

// route register user account
router.post('/register', function(req, res) {
  req.checkBody('name', 'Empty Name').notEmpty();
  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('password', 'Empty Password').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    return res.status(400).json({
      error: errors[0].msg
    })
  }

  User.findOne({email: req.body.email}).then(user => {
    if(user) {
      return res.status(400).json({
        error: {
          message: 'User is already'
        }
      })
    } 

    var user = new User()
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password)
    user.save().then(user => {
      return res.status(200).json({
        user
      })
    }) 
    .catch(error => {
      return res.status(400).json({
        error: error.message
      });
    }) ;
  })
} );


//route login user and return JWT 
router.post('/login', function (req, res, next) {
  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('password', 'Empty Password').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      error: errors[0].msg
    })
  }

  passport.authenticate('local', {session: false}, function(err, user, info) {
    if (err || !user) {
      return res.status(400).json({
        error: 'This user does not exists',
      });
    }

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          const userData = {
            _id: user._id,
            name: user.name,
            email: user.email
          }

          const token = jwt.sign(userData, config.secretKey);
          return res.json({...userData, token});
      });
  })(req, res)
})

module.exports = router;
