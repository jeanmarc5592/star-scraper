const mongoose = require("mongoose");

const Constellation = mongoose.model("constellation", {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sky: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    required: true,
  },
  max_brightness: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  right_ascension: {
    type: Array,
    required: true,
  },
  declination: {
    type: Array,
    required: true,
  },
  stars_brighter_3mag: {
    type: String,
    required: true,
  },
  brightest_star: {
    type: String,
    required: true,
  },
});

module.exports = Constellation;
