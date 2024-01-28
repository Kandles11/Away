const express = require('express');
const baggageController = require('../../controllers/baggage.controller');

const router = express.Router();

router.route('/').post(baggageController.createBaggage);
router.route('/').patch(baggageController.updateBaggage);
router.route('/').get(baggageController.getBaggage);
router.route('/bags/').get(baggageController.getBaggagesByUser);

module.exports = router;
