const Users = require("../model/users");
const Exams = require("../model/ExamSchema");
const getUserOfThisYear = async (req, res) => {
    res.send({
        users: await Users.find({ grade: req.body.year }),
        exams: await Exams.find({ year: req.body.year }),
    });
};
const getAllUsers = async (req, res) => {
    res.send(await Users.find({ isAdmin: false }));
};
const getUserData = async (req, res) => {
    const user = await Users.findById(req.body.id);
    res.send(user);
};
const updateDegree = async (req, res) => {
    const user = await Users.findById(req.body.userId);
    user.exams = user.exams.map((exam) => {
        if (exam.exam_id.toString() == req.body.exam_id) {
            exam.degree = req.body.degree;
        }
        return exam;
    });
    await Users.findByIdAndUpdate(user._id, user);
    res.send(true);
};

module.exports = { getUserOfThisYear, getAllUsers, getUserData, updateDegree };
