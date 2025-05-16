const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, required: true },
    thumbnail: { type: String },
    tags: [{ type: String }],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    images: [{ type: String }],
    description: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Trip', tripSchema, 'elestaoviajando.trips');
