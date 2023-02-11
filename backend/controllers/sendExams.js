const Exams = require("../model/ExamSchema")

const sendExams = async(req,res)=>{

    let data = await Exams.find({year:req.body.key,semester:req.body.semester})
    res.send(data)
}



module.exports = sendExams 