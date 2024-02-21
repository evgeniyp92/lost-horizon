/* eslint-disable no-param-reassign */
// custom error handling controller
const AppError = require('../utils/appError');

const handleGeneralError = err => {
	// eslint-disable-next-line no-console
	console.log(`generalError`);
	return new AppError(err.message, err.statusCode);
};

const sendErrorInDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
};

const sendErrorInProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		// eslint-disable-next-line no-console
		console.log(`[UNEXPECTED] ERROR : ${err}`);
		res.status(500).json({
			status: 'error',
			message:
				'Something went seriously wrong, n/ Please let an dev know so they can investigate',
		});
	}
};

module.exports = (err, _req, res, _next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Unhandled error 😬';

	if (process.env.NODE_ENV === 'development') {
		sendErrorInDev(err, res);
	} else {
		let error = { ...err, name: err.name };
		// TODO: Write proper error handling
		error = handleGeneralError(error);

		sendErrorInProd(error, res);
	}
};
