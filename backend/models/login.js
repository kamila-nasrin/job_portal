var mongoose = require('mongoose')
var schema = mongoose.Schema({
    Jobtitle:String,
    Cmpyname:String,
    Des:String,
    Req:String,
    Loc:String,
    Sal:Number,
    Jobtype:String,
    Industry:String

    
})
var JobModel = mongoose.model("login", schema)      //to create table (collection)
module.exports = JobModel