const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    latitude: String,
    longitude: String,
    name: String,
    city: String,
    state: String
    }, { collection: 'locations' });

module.exports = mongoose.model('locations', locationSchema);