const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    image: {
        type: String, // path to the uploaded image
        required: false,
    },
    resume: {
        type: String, // path to the uploaded resume
        required: false,
    },
    details: {
        type: String,
        required: true,
    }
});

const ProfileModel = mongoose.model('Profile', profileSchema);
module.exports = ProfileModel;
