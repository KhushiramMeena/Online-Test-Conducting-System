var mongoose = require('mongoose')

var testSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  subjects : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'subjectModel'
  }],
  questions : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'questionModel'
  }],
  maxmarks : {
    type : Number,
    required : true
  },
  queTypes : [{
    type : Number
  }],
  startTime : {
    type : Date
  },
  endTime : {
    type : Date,
    required : true
  },
  duration : {
    type : Number,
    required : true
  },
  regStartTime : {
    type : Date,
    required : true
  },
  regEndTime : {
    type : Date,
    required : true
  },
  resultTime : {
    type : Date,
    required : true
  },
  status : {
    type : String,
    enum : ['CREATED','Registration Started','Registration Completed','Test Started','Test Completed','Result Declared','Cancelled'],
    default : 'CREATED'
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel',
    required : true
  }
},
{
  timestamps : {}
})

module.exports = testSchema