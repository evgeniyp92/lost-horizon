const express = require('express');
const auditController = require('../controllers/auditController');

const router = express.Router();

router
	.route('/')
	.post(auditController.createEntry)
	.get(auditController.getAllEntries);

router.route('/:id').get(auditController.getEntry);

module.exports = router;
