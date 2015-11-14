'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	name: String,
	value: Number,
	description: String,
	timeAdded: { type: Date, required: true, default: new Date() }
});

var Item = mongoose.model('Item', itemSchema);


module.exports = Item;
