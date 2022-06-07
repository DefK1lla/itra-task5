const { Schema, model } = require('mongoose');

const User = new Schema({
    username: { type: String, required: true, unique: true },
    messages: []
});

module.exports = model('User', User);