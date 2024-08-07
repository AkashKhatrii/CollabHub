const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDesc: {
        type: String,
        required: true,
    },
    techStack: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    github: {
        type: String,
    },
    link: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
