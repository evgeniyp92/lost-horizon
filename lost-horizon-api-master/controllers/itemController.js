const Item = require('../models/itemModel');
const APIFeatures = require('../utils/apiFeatures');

exports.createItem = async (req, res) => {
	// TODO: Write code that will reject an attempt at creating an item with an
	// already existing serial. In theory this should be handled by the model

	try {
		const newItem = await Item.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				item: newItem,
			},
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Could not create item',
			details: err,
		});
	}
};

exports.getAllItems = async (req, res) => {
	// fina all non-hidden items
	try {
		const features = new APIFeatures(Item.find({ hidden: false }), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		// and populate the fields
		const allItems = await features.query.populate({
			path: 'location assignedItec',
			select: '-__v -email -squadron -flight -firstName',
		});

		res.status(200).json({
			status: 'success',
			message: 'All items retrieved successfully',
			data: allItems,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Could not retrieve all items',
			details: err.message,
		});
	}
};

exports.getItem = async (req, res) => {
	try {
		// try to find the item
		const item = await Item.findById(req.params.id).populate({
			path: 'location assignedItec',
		});
		// if it cant be found or the item is hidden, throw an error
		if (!item || item.hidden) {
			throw new Error('404 Item not found', { code: 404 });
		}
		res.status(200).json({
			status: 'success',
			message: 'Item retrieved successfully',
			data: item,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Could not retrieve item',
			details: err.message,
		});
	}
};

exports.updateItem = async (req, res) => {
	try {
		// simple find by id and update, will throw an error if validators fail
		const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'success',
			message: 'Item updated successfully',
			data: updatedItem,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Could not update item',
			details: err.message,
		});
	}
};

exports.deleteItem = async (req, res) => {
	// hides the item passed in the url
	try {
		await Item.findByIdAndUpdate(req.params.id, { hidden: true });
		res.status(204).json({
			status: 'success',
			message: 'This function returns HTTP 204, how are you seeing this?',
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'Could not delete item',
			details: err.message,
		});
	}
};
