const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    rent: {
      type: Number,
    },
  },
);

// Setting schema index for simple search function
propertySchema.index({'$**': 'text'});

module.exports = mongoose.model('Property', propertySchema);