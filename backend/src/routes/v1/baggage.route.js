const express = require('express');
const baggageController = require('../../controllers/baggage.controller');

const router = express.Router();

router.route('/').post(baggageController.createBaggage);
router.route('/').patch(baggageController.updateBaggage);
router.route('/').get(baggageController.getBaggage);
router.route('/user/:user').get(baggageController.getBaggagesByUser);
router.route('/').delete(baggageController.deleteBaggage);

module.exports = router;
