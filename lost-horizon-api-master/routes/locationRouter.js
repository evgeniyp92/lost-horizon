const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

router
	.route('/')
	.get(locationController.findAllLocations)
	.post(locationController.createLocation);

router
	.route('/:id')
	.get(locationController.findLocation)
	.patch(locationController.updateLocation)
	.delete(locationController.deleteLocation);

router.route('/findOrCreate').post(locationController.findLocationOrCreate);

module.exports = router;
