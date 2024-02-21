const User = require('../models/userModel');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* ------------------------------- CREATE USER ------------------------------ */
// stubbed out for now
exports.createUser = catchAsync(async (req, res, next) => {
	res.status(500).json({
		status: 'error',
		message: 'Endpoint not yet implemented',
	});
});

/* ------------------------------ GET ALL USERS ----------------------------- */
// get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: 'success',
		data: users,
	});
});

/* ------------------------------ GET ONE USER ------------------------------ */
// get a user by id
exports.getUser = catchAsync(async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: 'User not found',
		});
	}
});

/* ------------------------------- UPDATE USER ------------------------------ */
// will probably remain stubbed, as there is no real need for this
exports.updateUser = catchAsync(async (req, res, next) => {
	res.status(500).json({
		status: 'error',
		message: 'Endpoint not yet implemented',
	});
});

/* ------------------------------- DELETE USER ------------------------------ */
exports.deleteUser = catchAsync(async (req, res, next) => {
	res.status(500).json({
		status: 'error',
		message: 'Endpoint not yet implemented',
	});
});

// helper function to get user's id, required for profile info to run
exports.getMe = catchAsync(async (req, res, next) => {
	// console.log(req.user);
	const user = await User.findById(req.user.id);
	res.status(200).json({ message: 'success', user });
});
