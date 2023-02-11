const Exams = require("../model/ExamSchema");

const addExam = (req,res,next)=>{
    const {questions , year , semester,isShown , title , time} = req.body
    
    let data = new Exams({questions , year , semester , isShown, title , time})
    data.save()
    res.send("Done...")
    
}

module.exports = addExam