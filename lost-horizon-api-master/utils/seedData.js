/* eslint-disable no-console */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('../models/itemModel');
const convertToJson = require('./convertToJson');

dotenv.config({ path: '../config.env' });

const DB = process.env.DB_CONNECTION.replace(
	'<PASSWORD>',
	process.env.DB_ADM_PASS
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connection established');
	})
	.catch(err => {
		console.log(err);
	});

// const items = JSON.parse(fs.readFileSync(`${__dirname}/seedItems.json`));

const importData = async () => {
	const items = await convertToJson();
	console.log(`finished loading items`);
	try {
		console.log(`Trying to create database objects...`);
		await Item.create(items);
		console.log('Data successfully loaded!');
	} catch (err) {
		console.error(err);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Item.deleteMany();
		console.log('Data succesfully deleted');
	} catch (err) {
		console.error(err);
	}
	process.exit();
};

if (process.argv[2] === '-seed') {
	mongoose
		.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Connection established, attempting to populate database');
			importData();
		})
		.catch(err => {
			console.log(err);
		});
}

if (process.argv[2] === '-purge') {
	deleteData();
}
