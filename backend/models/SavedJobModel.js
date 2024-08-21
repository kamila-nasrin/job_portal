// models/SavedJobModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'jobs',
        required: true
    },
    savedAt:{type:Date,default:Date.now}
});

const SavedJobModel = mongoose.model('SavedJob', schema);
module.exports = SavedJobModel;
