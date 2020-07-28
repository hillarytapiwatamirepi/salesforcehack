const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    googleid: String,
    username: String,
    age: String,
    email: String,
    phone: String,
    password: String,
    location: String,
    workplace: String
});

// compile model from schema
module.exports = mongoose.model('user', UserSchema);
