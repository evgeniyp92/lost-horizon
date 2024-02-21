/* eslint-disable no-console */

// Please use version 5.13.8 of mongoose as TLS has issues in future versions
// TLS is needed to connect to AWS instance of Mongo
const mongoose = require('mongoose');
const path = require('path');


// eslint-disable-next-line import/newline-after-import
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// contact Evgeniy Pimenov for the env file
// NOTE: Updated config.env is located in mongo-setup.md for AWS connection

console.log(process.env.NODE_ENV)

const DB =
	process.env.NODE_ENV === 'production'
		? process.env.DB_CONNECTION_AWS.replace(
				'<PASSWORD>',
				process.env.DB_ADM_PASS
		  )
		: process.env.DB_CONNECTION.replace('<PASSWORD>', process.env.DB_ADM_PASS);

// console.log(`\nConnecting to ${DB} (${process.env.NODE_ENV})\n`);

const mongoConfig =
	process.env.NODE_ENV === 'production'
		? {
				// Production
				tls: true,
				tlsAllowInvalidHostnames: true,
				tlsCAFile: path.join(__dirname, './us-gov-west-1-bundle.pem'),
				useNewUrlParser: true,
				useUnifiedTopology: true,
				// useCreateIndex: true,
				// useFindAndModify: false,
		  }
		: {
				// Non Production
				useNewUrlParser: true,
				useUnifiedTopology: true,
				// 		// useCreateIndex: true,
				// 		// useFindAndModify: false,
		  };

// console.log('mongoConfig: ', mongoConfig);

// Connect to Mongoose!
mongoose.connect(DB, mongoConfig).catch(e => {
	console.log('Error connecting to MongoDB!');
});
mongoose.connection.on('error', e => {
	console.log(`MongoDB Connection Error: ${DB}`);
	console.error(e)
});
mongoose.connection.on('connected', () => {
	console.log(`DB Connected: ${DB}`);
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
	console.error('!!! [DGE] Unhandled rejection, shutting down...');
	console.error(err);
	server.close(() => {
		process.exit(1);
	});
});
