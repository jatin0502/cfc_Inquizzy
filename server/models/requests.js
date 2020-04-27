const mongoose = require('mongoose');
const user = require('./users');
const location = require('./locations');

const requestSchema = mongoose.Schema({
    requested_item: String,
    requested_quantity: String,
    requested_urgency: String,
    requested_date: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    area_id: { type: mongoose.Schema.Types.ObjectId, ref: 'location', required: true },
    status: { type: String, enum: ['new', 'open', 'in-progress','closed'], default: 'new' },
    assigned_to_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
    accepted_date: { type: Date,default: undefined },
    closed_date: { type: Date,default: undefined }
    }, { collection: 'requests' });

    module.exports = mongoose.model('requests', requestSchema);