const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    profilePicture: {
        type: String, // URL or path to the profile picture
    },
    github: {
        type: String,
    },
    skills: {
        type: [String], // Array of skills
    },
    interests: {
        type: [String], // Array of interests
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    technologies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technology',
    }]
});

module.exports = mongoose.model('UserProfile', ProfileSchema);
