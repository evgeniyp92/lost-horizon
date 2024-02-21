const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
	date: {
		// defaults to the date at the instant of creation
		// should not be sent as a data item in the body
		type: Date,
		default: new Date(Date.now()),
	},
	user: {
		// ref to the user
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'No user specified'],
	},
	item: {
		// ref to the item
		type: mongoose.Schema.ObjectId,
		ref: 'Item',
		required: [true, 'No item specified'],
	},
	action: {
		// the action that was performed
		type: String,
		required: [
			true,
			'No action specified. Valid actions are "create", "update", "delete"',
		],
		enum: ['create', 'update', 'delete'],
	},
	originLocation: {
		// the location of the item before the action was performed
		type: mongoose.Schema.ObjectId,
		ref: 'Location',
	},
	destinationLocation: {
		// the location of the item after the action was performed
		type: mongoose.Schema.ObjectId,
		ref: 'Location',
	},
});

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;
