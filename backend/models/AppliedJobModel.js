// models/AppliedJobModel.js
var mongoose = require('mongoose');
var schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }, // Reference to the job
    appliedAt: { type: Date, default: Date.now }
});

var AppliedJobModel = mongoose.model('applied_jobs', schema); // Create collection
module.exports = AppliedJobModel;
