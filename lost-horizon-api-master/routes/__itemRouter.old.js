const express = require('express');
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

const router = express.Router();

/* ------------------------- ⬇️ AUTH ONLY ROUTES ⬇️ ------------------------- */
/* ------------------ Routes without an id being passed in ------------------ */
router.use(authController.protect);
router
	.route('/')
	.get(itemController.getAllItems)
	.post(itemController.createItem);

/* ---------------- Routes that require an id to be passed in --------------- */
// TODO: Update these routes to immediately reject requests that don't have an
// id
router
	.route('/:id')
	.get(itemController.getItem)
	.patch(itemController.updateItem)
	.delete(itemController.deleteItem);

/* ------------------------- ⬇️ ADMIN ONLY ROUTES ⬇️ ------------------------ */
router.use(authController.restrictTo('admin'));
/* ----------------------------- Utility routes ----------------------------- */

router
	.route('/outdated-inventory/:days')
	.get(itemController.getAllItemsToBeInventoried);

module.exports = router;
