/* eslint-disable consistent-return, no-underscore-dangle */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

/* ------------------------------- USER SIGNUP ------------------------------ */
exports.signUp = catchAsync(async (req, res, next) => {
	// Create the object in memory
	const userToCreate = {
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		rank: req.body.rank,
		squadron: req.body.squadron,
		flight: req.body.flight,
	};

	// Create the user in the datbase
	const newUser = await User.create(userToCreate);

	// If everything went well, send the user back to the client
	// TODO: review if sending the user data back is necessary
	res.status(201).json({
		status: 'success',
		info: `user created`,
		newUser,
	});
});

/* ---------------------------------- LOGIN --------------------------------- */
exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Check if if email was provided
	if (!email) {
		return next(new AppError('Please provide an email', 400));
	}

	// Check if password was provided
	if (!password) {
		return next(new AppError('Please provide a password', 400));
	}

	// Lookup the user by email in the users collection
	const user = await User.findOne({ email }).select('+password');

	// Throw an error if the user cant be found
	if (!user) {
		return next(new AppError('Invalid credentials', 401));
	}

	// Throw an error if the password doesnt match
	if (!(await user.correctPassword(password, user.password))) {
		return next(new AppError('Invalid credentials', 401));
	}

	// Create the token and sign it
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '900000', // 15 minutes
	});

	// TODO: CREATE A COOKIE SECRET?

	// Set the cookie with the token
	// FIXME: cookie age is not respected, nor is the cookie stored in the browser
	res.cookie('jwt', token, {
		maxAge: 604800000, // 1 week.
		// httpOnly: true, // I believe this is what causes axios to treat the request as a non-op
	});

	// Send back the response
	res.status(200).json({
		status: 'success',
		message: 'authenticated successfully',
		// send the token in the body to be captured by the cookies-js on the frontend
		// once the fix for cookies is in place this can be removed
		token,
	});
});

/* --------------------------- PROTECTION FUNCTION -------------------------- */
exports.protect = catchAsync(async (req, res, next) => {
	// Set up memory for the token
	let token;

	// If there is an authorization key, and it starts with Bearer, set the token
	// to the value after Bearer
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}
	// TODO: write code to handle cookies as well

	// If there is no token, throw an error
	if (!token) {
		return next(new AppError('Not logged in', 401));
	}

	// From here, we assume that a token is provided
	// Verify the token
	// This will automatically throw an error if the token is invalid
	const decodedToken = await promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);

	// Try to find the user
	const currentUser = await User.findById(decodedToken.id);

	// If the user cant be found, throw an error
	if (!currentUser) {
		return next(new AppError('User not found', 401));
	}

	// Check if the user used the reset password form after logging in, thereby
	// invalidating his token
	if (currentUser.changedPasswordAfter(decodedToken.iat)) {
		return next(new AppError('Token is expired, log in again', 401));
	}

	// The token has passed all checks, attach the user object to the request and
	// hand off to the handler function
	req.user = currentUser;
	next();
});

/* -------------------------- RESTRICTION FUNCTION -------------------------- */
// If the roles do not match up, throw an error, otherwise continue
exports.restrictTo =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('Insufficient rights', 403));
		}

		next();
	};

/* ------------------------ UPDATE PASSWORD WITH JWT ------------------------ */
exports.updatePassword = catchAsync(async (req, res, next) => {
	// Get user from collection. This is only supposed to run behind protect() so
	// we can assume we have req.user available to us
	const user = await User.findById(req.user.id).select('+password');

	// Check if the user has provided a password and a confirmation
	if (!req.body.password || !req.body.passwordConfirm) {
		const err = 'You must provide a new password and/or password confirmation';
		return next(new AppError(err, 400));
	}

	// Check if the provided new password and confirmation match
	if (req.body.password !== req.body.passwordConfirm) {
		const err = 'The new password and confirmation do not match';
		return next(new AppError(err, 403));
	}

	// Check if the provided password is the same as the old one. Have to use a
	// class method because we need to compare the passwords with bcrypt
	if (await user.correctPassword(req.body.password, user.password)) {
		const err = 'Password cannot be the same as the old one';
		return next(new AppError(err, 403));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	// Create the token and sign it
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '900000',
	});

	// Create a cookie for the jwt
	res.cookie('jwt', token, {
		maxAge: 604800000,
		httpOnly: true,
	});

	// Send the http response
	res.status(201).json({
		status: 'success',
		message: 'Password updated',
		token,
	});
});
