const Location = require('../models/locationModel');

// creating a new location
exports.createLocation = async (req, res) => {
	try {
		const newLocation = await Location.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				location: newLocation,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Could not create location',
			details: error.message,
		});
	}
};

// find location by id, not in use
exports.findLocation = async (req, res) => {
	try {
		const allLocations = await Location.findOne(req.params.id);
		res.status(200).json({
			status: 'success',
			data: {
				allLocations,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Could not find location',
			details: error.message,
		});
	}
};

exports.findLocationOrCreate = async (req, res) => {
	// reject the request if no body is provided
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			status: 'error',
			reason: 'No body provided',
		});
	} else {
		// try to find the location
		try {
			const location = await Location.find({
				$and: [
					{ 'warehouseLocation.building': req.body.building },
					{ 'warehouseLocation.stockroom': req.body.stockroom },
					{ 'warehouseLocation.shelf': req.body.shelf },
					{ 'warehouseLocation.level': req.body.level },
				],
			});
			// console.log(location);
			// if the location is found, return it
			if (location.length) {
				res.status(200).json({
					status: 'success',
					result: location[0].id,
				});
			} else {
				// if the location is not found, create it and return it
				const newLocation = await Location.create({
					isDeployed: false,
					warehouseLocation: { ...req.body },
				});

				res.status(201).json({
					status: 'success',
					result: newLocation.id,
				});
			}
		} catch (error) {
			// general catch-all for any other errors
			res.status(500).json({
				status: 'error',
				message: error,
			});
		}
	}
};

// get a list of all locations and populate it
exports.findAllLocations = async (req, res) => {
	try {
		const allLocations = await Location.find().populate({
			path: 'itemsInLocation',
			select: 'name partNumber serialNumber -location -_id',
		});
		res.status(200).json({
			status: 'success',
			data: {
				allLocations,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Could not get all locations',
			details: error.message,
		});
	}
};

// stub to update a location, probably wont ever be used
exports.updateLocation = async (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'Not yet implemented',
	});
};

// stub do delete a location
exports.deleteLocation = async (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'Not yet implemented',
	});
};
