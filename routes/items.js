'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res){
	Item.find({}, function(err, items) {
		console.log(items);
	});
});



// router.get('/name/:name', function(req, res){
// 	console.log('PARAMS:', req.params);
// 	Item.find({name: req.params.name}, function(err, items) {
// 		res.send(items);
// 	});
// })
router.get('/id/:id', function(req, res){
	console.log('PARAMS:', req.params);
	Item.find({_id: req.params.id}, function(err, items) {
		res.send(items);
	});
})


router.post('/', function(req, res){
	var item = new Item(req.body);
	item.save(function(err, savedItem){
		console.log(savedItem);
		res.send(savedItem);
	})
});

router.put('/', function(req, res) {
  Item.findByIdAndUpdate( req.body._id , req.body, function(err, item){
    res.send(item);
  });
});
router.put('/id/:id', function(req, res) {
  Item.update({_id:req.params.id} , req.body, function(err, item){
    res.send(item);
  });
});

router.delete('/', function(req, res) {
	console.log(req.body.change);
		Item.remove({name: req.body.name}, function(err, post){
			res.send(post);
		});
});
router.delete('/id/:id', function(req, res) {
  Item.findByIdAndRemove({_id:req.params.id}, function(err, item){
    res.send("item deleted");
  });
});


module.exports = router;
