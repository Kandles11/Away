const catchAsync = require('../utils/catchAsync');

const Baggage = require('../models/baggage.model');

const createBaggage = catchAsync(async (req, res) => {
  const { user, tagData } = req.body;

  try {
    const baggage = await Baggage.create({ user, tagData });
    res.status(200).json(baggage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  createBaggage,
};
