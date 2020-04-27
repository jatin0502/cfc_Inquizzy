const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    username: String,
    email: String,
    phone: String,
    role_type: [String],
    age: String,
    gender: String,
    address: String,
    pin: String,
    homeCoordinatesLat: String,
    homeCoordinatesLong: String,
    area_id: { type: mongoose.Schema.Types.ObjectId, ref: 'location', required: true },
    regdate: { type: Date, default: Date.now }
    }, { collection: 'users' });

    module.exports = mongoose.model('users', userSchema);