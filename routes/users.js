var express = require('express');
var router = express.Router();

var Poll = require('../server/models/poll');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    name: "John",
    last: "Smith"
  });
});

router.get('/authenticated', function(req, res, next) {
  var authed = false;
  if (req.isAuthenticated()) {
    authed = true;
  }
  res.json({'authenticated': authed});
});    
    
router.get('/get-current-user', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({'user': req.user});
  } else {
    res.json({'userId': '-1'});
  }
}); 

router.get('/get-id-of-logged-in', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({'user': req.user.twitter.id});
  } else {
    res.json({'userId': '-1'});
  }
});

router.get('/polls', function(req, res) {
  if(req.isAuthenticated()) {
    var userId = req.user.twitter.id;

    console.log('Looking for polls with a creator id of: ', userId);

    Poll.find({'creatorId': userId}, function (err, polls) {
      if(err) console.log('Err: ', err);
      res.json(polls);
    });
  } else {
    res.json({});
  }
});

module.exports = router;
