const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const baggageSchema = mongoose.Schema({
  tagData: {
    type: String,
    required: true,
    trim: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  claimed: {
    type: Boolean,
    default: false,
  },
});

baggageSchema.plugin(toJSON);
baggageSchema.plugin(paginate);

const Baggage = mongoose.model('Baggage', baggageSchema);
module.exports = Baggage;
