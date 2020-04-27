const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    username: String,
    password: String,
    security_question: String,
    security_answer: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
    last_login_date: { type: Date, default: Date.now }
    }, { collection: 'logins' });

    module.exports = mongoose.model('logins', loginSchema);