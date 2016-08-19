var express = require('express');
var router = express.Router();

var Poll = require('../server/models/poll');

// define the home page route
router.get('/', function(req, res) {
    Poll.find({}, function (err, polls) {
        if(err) console.log('Err: ', err);
        res.json(polls);
    });
});

router.post('/', function(req, res) {
    // Create a new poll

    var poll = new Poll({
      name: req.body.name,
      creatorId: req.body.creatorId,
      options: req.body.options
    });

    poll.save(function (err, poll) {
      if (err) { 
        console.log('error saving poll: ', err);
      }
      res.status(201).json(poll);
    });

});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Poll.findOne({'_id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
  });             
});

router.put('/:id', function(req, res) {
    //let id = req.params.id;
    //console.log('Will update poll with id of: ', id);

    var poll = req.body;
    var id = poll._id;

    delete poll._id;

    if (id) {
        Poll.update({_id: id}, poll, {upsert: true}, function (err, poll) {
            if(err) console.log('Err: ', err);
            //res.json(poll);
            Poll.findOne({'_id':id},function(err, result) {
                if(err) console.log('Err: ', err);
                return res.send(result);
            });           
        });
    }    
});

router.delete('/:id', function(req, res) {
    //return res.send('API Route to DELETE a poll with id of: ' + req.params.id);
    var id = req.params.id;
    Poll.remove({'_id': id},function(result) {
        Poll.find({}, function (err, polls) {
            if(err) console.log('Err: ', err);
            res.json(polls);
        });      
    });    
});

module.exports = router;