/* eslint-disable func-names */
// noinspection MagicNumberJS

const mongoose = require('mongoose');

// TODO: Update the location fields back to an object to take advantage of
// unwind in the aggregation pipeline

const itemSchema = new mongoose.Schema(
	{
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
		cost: {
			type: Number,
			required: [true, 'No cost specified'],
		},
		quantity: {
			type: Number,
			required: [true, 'No quantity specified'],
		},
		warehouse: {
			type: String,
			required: [true, 'Item must be assigned to a warehouse'],
			enum: ['19', '03'],
		},
		stockroom: {
			type: String,
			required: [true, 'Item must be assigned to a stockroom'],
			maxlength: [1, 'Stockroom name is one letter'],
		},
		shelf: {
			type: Number,
			required: [true, 'Item must be assigned to a shelf'],
			min: [1, 'Shelf number must be greater than 0'],
			max: [999, 'Shelf number must be less than 1000'],
		},
		level: {
			type: String,
			required: [true, 'Item must be assigned to a level'],
			maxlength: [1, 'Level name is one letter'],
		},
		bin: {
			type: Number,
			required: [true, 'Item must be assigned to a bin'],
			min: [1, 'Bin number must be greater than 0'],
			max: [999, 'Bin number must be less than 1000'],
		},
		layer: {
			type: String,
			maxlength: [1, 'Layer name is one letter'],
		},
		printed1574: {
			type: Boolean,
			default: false,
		},
		printedBinLabel: {
			type: Boolean,
			default: false,
		},
		EOLDate: {
			type: Date,
		},
		lastInventoryDate: {
			type: Date,
		},
		journal: {
			type: Array,
		},
		updatedAt: {
			type: Date,
		},
		wasAnythingUpdated: Boolean,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

itemSchema.virtual('totalCost').get(function () {
	return this.cost * this.quantity;
});

// add an updatedDate if the document has been modified
itemSchema.pre('save', function (next) {
	const now = new Date();
	if (!this.updatedAt) {
		this.updatedAt = now;
	}
	next();
});

itemSchema.methods.addJournalEntry = function (body) {
	// Filter invalid body props to update
	const updatedProperties = Object.keys(body).filter(element =>
		// eslint-disable-next-line no-underscore-dangle
		Object.keys(this._doc).includes(element)
	);

	// TODO: Solve this
	// See scratchpad.js for an implementation that will work
	// For some reason this doesnt work but im gonna keep it here
	// // Filter away body props that were not actually updated
	// const validatedUpdates = [];
	// updatedProperties.forEach(element => {
	//   if (this._doc[element] !== body[element]) {
	//     validatedUpdates.push(element);
	//   }
	// });

	// Create the new journal entry
	this.journal.push({
		dateTime: new Date(Date.now()),
		changedProperties: updatedProperties.map(
			element => `${element} was updated to ${body[element]}`
		),
	});

	return this;
};

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
