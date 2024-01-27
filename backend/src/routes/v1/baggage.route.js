const express = require('express');
const baggageController = require('../../controllers/baggage.controller');

const router = express.Router();

router.route('/').post(baggageController.createBaggage);

module.exports = router;
