const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect);
// router.use(authController.restrictTo('superadmin'));

router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route('/:id')
	.get(authController.protect, userController.getMe)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
