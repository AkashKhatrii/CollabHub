const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technologySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    proficiency: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;
