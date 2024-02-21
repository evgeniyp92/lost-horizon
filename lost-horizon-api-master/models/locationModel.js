/* eslint-disable func-names */
const mongoose = require('mongoose');

// FIXME: something is jacked up with the validation in this schema

// Init the root schema
const locationSchema = new mongoose.Schema(
	{
		// isDeployed field to denote between warehouse locations and production
		// locations
		isDeployed: {
			type: Boolean,
		},
		// child schema
		deployedLocation: new mongoose.Schema({
			building: {
				type: Number,
				// validation for correct input
				validate: [
					function () {
						// if the parent document shows that the location is deployed just
						// pass the validation
						if (!this.parent().isDeployed) return true;
						// validate the input
						return /^201$|^408$|^530$|^547$|^548$|^2019$|^2381$|^2386$|^2470$/gm.test(
							this.building
						);
					},
					'Invalid building specified. Contact DevOps if you need help',
				],
			},
			room: {
				type: String,
				validate: [
					function () {
						if (!this.parent().isDeployed) return true;
						return /^[0-9A-Z]{1,4}$/gm.test(this.room);
					},
					'Invalid room specified. Contact DevOps if you need help',
				],
			},
			desk: {
				type: String,
				validate: [
					function () {
						if (!this.parent().isDeployed) return true;
						return /^[0-9A-Z]{1,3}$/gm.test(this.desk);
					},
					'Invalid desk specified. Contact DevOps if you need help',
				],
			},
		}),
		warehouseLocation: new mongoose.Schema({
			building: {
				type: Number,
				validate: [
					function () {
						if (this.parent().isDeployed) return true;
						return /^2019|530$/gm.test(this.building);
					},
					'Invalid building specified. Contact DevOps if you need help',
				],
			},
			stockroom: {
				type: String,
				validate: [
					function () {
						if (this.parent().isDeployed) return true;
						return /^[A-D]{1}$/gm.test(this.stockroom);
					},
					'Invalid stockroom specified. Contact DevOps if you need help',
				],
			},
			shelf: {
				type: Number,
				validate: [
					function () {
						if (this.parent().isDeployed) return true;
						return /^[1-9]$|^[1-9][0-9]$/gm.test(this.shelf);
					},
					'Invalid shelf specified. Contact DevOps if you need help',
				],
			},
			level: {
				type: String,
				validate: [
					function () {
						if (this.parent().isDeployed) {
							return true;
						}
						return /^[A-Z]{1}$/gm.test(this.level);
					},
					'Invalid level specified. Contact DevOps if you need help',
				],
			},
			bin: {
				type: Number,
				validate: [
					function () {
						if (this.parent().isDeployed) return true;
						return /^[1-9]$|^[1-9][0-9]$/gm.test(this.bin);
					},
					'Invalid bin specified. Contact DevOps if you need help',
				],
			},
		}),
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// virtual lookup for the location
locationSchema.virtual('itemsInLocation', {
	ref: 'Item',
	localField: '_id',
	foreignField: 'location',
});

// validation check to prevent users from creating deployed locations inside the
// warehouse stockrooms and vice versa
locationSchema.path('isDeployed').validate(function () {
	if (this.isDeployed === false && !this.warehouseLocation) {
		return false;
	}

	if (this.isDeployed === true && !this.deployedLocation) {
		return false;
	}
}, 'Location must be either deployed or in warehouse, and isDeployed must be set accordingly');

// setting up indexes so that users are prevented from creating dups
locationSchema.index({ deployedLocation: 1 }, { unique: true, sparse: true });
locationSchema.index({ warehouseLocation: 1 }, { unique: true, sparse: true });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
