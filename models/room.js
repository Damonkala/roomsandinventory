'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var roomSchema = schema({
	name: { type: String, required: true },
	timeAdded: { type: Date, required: true, default: new Date() },
	items: [{ type: schema.Types.ObjectId, ref: "Item"}]
});

var Room = mongoose.model('Room', roomSchema);


module.exports = Room;
