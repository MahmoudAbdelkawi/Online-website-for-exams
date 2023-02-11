const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    questions:Array,
    year:String , 
    semester:String,
    title:String,
    time:Number,
    isShown:Boolean,
}) 

const Exams = mongoose.model("Exams" , schema)

module.exports = Exams