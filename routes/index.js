'use strict';

var express = require('express');
var router = express.Router();

var Room = require('../models/room');
var Item = require('../models/item');

router.get('/', function(req, res) {
  Room.find({}, function(err, rooms){
    res.render("index", {rooms: rooms});
  });
});

module.exports = router;
