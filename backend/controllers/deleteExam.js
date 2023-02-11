const Exams = require("../model/ExamSchema");
const Users = require("../model/users");

const deleteExam = async (req, res) => {
    let data = await Exams.deleteOne(req.body.id);
    res.send("Deleted Successfully");
};

const deleteQuestion = async (req, res) => {
    let data = await Exams.findById(req.body.id);
    data.questions = data.questions.filter((el) => el.number != req.body.index);
    let newData = await Exams.findByIdAndUpdate({ _id: req.body.id }, data);
    res.send("Deleted Successfully");
};

const updateExam = async (req, res) => {
    let { _id, questions ,title , time } = req.body;
    let data = await Exams.findById(_id);
    
    data.questions = questions;
    data.title = title;
    data.time = time;
    let newData = await Exams.findByIdAndUpdate({ _id }, data);
    res.send("updated ....!");
};

const shownExams = async (req, res) => {
    console.log(req.body);
    let exams1 = await Exams.find({ isShown: true, year: req.body.year });
    exams1.forEach(async (exam) => {
        exam.isShown = false;
        await Exams.findByIdAndUpdate(exam._id, exam);
    });

    req.body.exams.map(async (item) => {
        let data = await Exams.findById(item);
        data.isShown = true;
        await Exams.findByIdAndUpdate(item, data);
    });
    setTimeout(async () => {
        let exams = await Exams.find({ isShown: true });
        let users = await Users.find();
        users.forEach(async (user) => {
            const temp = user.exams;
            user.exams = [];
            exams.forEach((exam) => {
                console.log(exam.title);
                if (user.grade === exam.year) {
                    user.exams.push({ exam_id: exam._id, degree: -1,title:exam.title});
                }
            });
            // replace old exams with the gradded one

            temp.forEach((t) => {

                user.exams = user.exams.map((exam) => {
                    if (t.exam_id.toString() == exam.exam_id.toString()) {
                        exam.degree = t.degree;
                    }
                    return exam;
                });
            });
            await Users.findByIdAndUpdate(user._id, user);
        });
        res.send(true);
    }, 500);
};

module.exports = { deleteExam, deleteQuestion, updateExam, shownExams };
