const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Optional: You can add a reference to the Profile model if you want
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
    }
});

module.exports = mongoose.model('User', UserSchema);
