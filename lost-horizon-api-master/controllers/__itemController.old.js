/* eslint-disable consistent-return */
const Item = require('../models/itemModel');

const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* ------------------------------- Create item ------------------------------ */
exports.createItem = catchAsync(async (req, res, _next) => {
	const newItem = await Item.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			item: newItem,
		},
	});
});

/* ------------------------------ Get all items ----------------------------- */
exports.getAllItems = catchAsync(async (req, res, _next) => {
	const features = new APIFeatures(Item.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();
	const items = await features.query;

	res.status(200).json({
		status: 'success',
		results: items.length,
		data: {
			items,
		},
	});
});

/* -------------- Get all items that are past due for inventory ------------- */
exports.getAllItemsToBeInventoried = catchAsync(async (req, res, _next) => {
	const stats = await Item.aggregate([
		{
			$match: {
				$or: [
					{
						lastInventoryDate: {
							$lte: new Date(
								new Date().getTime() - req.params.days * 24 * 60 * 60 * 1000
							),
						},
					},
					{ lastInventoryDate: undefined },
				],
			},
		},
		{
			$sort: { lastInventoryDate: 1 },
		},
	]);

	res.status(200).json({
		status: 'success',
		results: stats.length,
		data: {
			stats,
		},
	});
});

/* ----------------------------- Get single item ---------------------------- */
exports.getItem = catchAsync(async (req, res, next) => {
	const item = await Item.findById(req.params.id);

	if (!item) {
		return next(new AppError('No item found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: item,
	});
});

/* ------------------------------- Update item ------------------------------ */
exports.updateItem = catchAsync(async (req, res, next) => {
	// Get item based on id
	const item = await Item.findById(req.params.id);

	// If no item found, return error
	if (!item) {
		return next(new AppError('No item found with that ID', 404));
	}

	Object.keys(req.body).forEach(
		// eslint-disable-next-line no-return-assign
		property => (item[property] = req.body[property])
	);

	// Save it to the database
	await item.addJournalEntry(req.body).save();

	// Send the response to the user
	res.status(200).json({
		status: 'success',
		data: {
			item,
		},
	});
});

/* ------------------------------- Delete item ------------------------------ */
exports.deleteItem = catchAsync(async (req, res, next) => {
	const item = await Item.findByIdAndDelete(req.params.id);

	if (!item) {
		return next(new AppError('No item found with that ID', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
