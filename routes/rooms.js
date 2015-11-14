'use strict';

var express = require('express');
var router = express.Router();

var Room = require('../models/room');
var Item = require('../models/item')

router.get('/', function(req, res){
	Room.find({}, function(err, rooms){
		res.send(rooms);
		console.log(rooms);
	}).populate('items');
	})

	// });


	router.put('/:roomId/addItem/:itemId', function(req, res) {
	  Room.findById(req.params.roomId, function(err, room){
	    if(err) return res.status(400).send(err.message);
	    Item.findById(req.params.itemId, function(err, item){
	      if(err) return res.status(400).send(err.message);
	      if(room.items.indexOf(item._id) !== -1) {
	        return res.status(400).send('item already in room');
	      }
	      room.items.push(item._id);
	      room.save(function(err){
	        res.status(err ? 400 : 200).send(err ? 'item add failed' : 'item added');
	      });
	    });
	  });
	});

router.get('/id/:id', function(req, res){
	console.log('PARAMS:', req.params);
	Room.find({_id: req.params.id}, function(err, rooms) {
		res.send(rooms);
	});
})

router.post('/', function(req, res){
	var room = new Room(req.body);
	room.save(function(err, savedRoom){
		console.log(savedRoom);
		res.send(savedRoom);
	})
});


router.put('/', function(req, res) {
  Room.findByIdAndUpdate( req.body._id , req.body, function(err, room){
    res.send(room);
  });
});

router.put('/id/:id', function(req, res) {
  Room.update({_id:req.params.id} , req.body, function(err, room){
    res.send(room);
  });
});

router.delete('/', function(req, res) {
  Room.findByIdAndRemove(req.body._id, function(err, room){
    res.send();
  });
});
router.delete('/id/:id', function(req, res) {
  Room.findByIdAndRemove({_id:req.params.id}, function(err, room){
    res.send("room deleted");
  });
});


module.exports = router;
