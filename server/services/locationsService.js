const jwt = require("jsonwebtoken");
const Locations = require("../models/locations");
const config = require("../config");

// users hardcoded for simplicity, store in a db for production applications
async function getLocations() {
  try {
    return await Locations.find({}, (err, locations) => locations);
  } catch (error) {
    return {
      error
    };
  }
}

module.exports = {
  getLocations
};
