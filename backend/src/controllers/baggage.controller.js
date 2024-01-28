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

const updateBaggage = catchAsync(async (req, res) => {
  const { tagData, claimed } = req.body;

  const filter = { tagData };
  const update = { claimed };

  try {
    const baggage = await Baggage.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json(baggage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getBaggage = catchAsync(async (req, res) => {
  const { tagData } = req.body;

  try {
    const baggage = await Baggage.findOne({ tagData }).exec();
    res.status(200).json(baggage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getBaggagesByUser = catchAsync(async (req, res) => {
  const { user } = req.body;

  try {
    const baggages = await Baggage.find({ user }).exec();
    res.status(200).json(baggages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  createBaggage,
  updateBaggage,
  getBaggage,
  getBaggagesByUser,
};
