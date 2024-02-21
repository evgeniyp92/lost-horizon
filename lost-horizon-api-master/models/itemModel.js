const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'No name specified'],
		trim: true,
		maxlength: [127, 'Item name is too long'],
		minlength: [2, 'Item name is too short'],
		uppercase: true,
	},
	partNumber: {
		type: String,
		required: [true, 'No part number specified'],
	},
	isTrackable: {
		type: Boolean,
		required: [true, 'Must indicate if the item is trackable or not'],
	},
	serialNumber: {
		type: String,
		unique: true,
		sparse: true,
		// eslint-disable-next-line object-shorthand, func-names
		required: [
			function () {
				if (this.isTrackable === true) {
					return true;
				}
				return false;
			},
			'No serial number specified',
		],
	},
	quantity: {
		type: Number,
		required: [true, 'No quantity specified'],
		validate: [
			function () {
				if (this.isTrackable === true) {
					return this.quantity === 1;
				}
				return true;
			},
			'Invalid quantity specified. Tracked items cannot have a quantity above 1.',
		],
	},
	cost: {
		type: Number,
		required: [true, 'No cost specified'],
	},
	reorderQuantity: {
		type: Number,
	},
	hidden: {
		type: Boolean,
		default: false,
	},
	location: {
		type: mongoose.Schema.ObjectId,
		ref: 'Location',
		required: [true, 'Item must be assigned to a location'],
	},
	assignedItec: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	// TODO: I think this needs to be a virtual lookup field
	// TODO: rewrite this to have the correct reference
	events: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Event',
	},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
