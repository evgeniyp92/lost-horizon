// import the Audit model
const Audit = require('../models/auditModel');

/* ---------------------------- CREATE ONE ENTRY ---------------------------- */
exports.createEntry = async (req, res) => {
	try {
		const newEntry = await Audit.create(req.body);
		res.status(201).json({
			status: 'success',
			message: 'audit entry created successfully',
			data: {
				entry: newEntry,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Could not create audit entry',
			details: error.message,
		});
	}
};

/* ----------------------- GET ALL ENTRIES (w/lookups) ---------------------- */
exports.getAllEntries = async (req, res) => {
	try {
		const allEntries = await Audit.find().populate({
			path: 'user item originLocation destinationLocation',
		});
		res.status(200).json({
			status: 'success',
			message: 'All audit entries retrieved successfully',
			data: allEntries,
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Could not retrieve all audit entries',
			details: error.message,
		});
	}
};

/* ------------------------- GET ONE SPECIFIC ENTRY ------------------------- */
// TODO: this isnt being called anywhere, need to add populates to the route
exports.getEntry = async (req, res) => {
	try {
		const entry = await Audit.find(req.params.id);
		res.status(200).json({
			status: 'success',
			message: 'audit entry retrieved successfully',
			data: {
				entry,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Could not retrieve audit entry',
			details: error.message,
		});
	}
};
