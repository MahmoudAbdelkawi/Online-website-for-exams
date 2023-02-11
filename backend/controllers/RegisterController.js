const Exams = require("../model/ExamSchema");
const Users = require("../model/users");
const register = async (req, res) => {
    let { name, email, password, grade, isAdmin } = req.body;
    if (req.body.name) {
        // sign up
        let findEmail = await Users.findOne({ email });
        if (findEmail) {
            res.send("the email is found");
        } else {
            // -----------------------
            isAdmin = false;
            let temp = await Exams.find({ isShown: true, year: grade });
            let exams = temp.map((t) => {
                return { exam_id: t._id, degree: -1 };
            });
            let user = new Users({
                name,
                email,
                password,
                grade,
                isAdmin,
                exams,
            });

            user.save();
            res.send("signup successfully");
        }
    } else {
        // login
        let user = await Users.findOne({ email });
        if (!user) {
            res.send("Wrong Email Or Password");
        }
        // else if (password === user.password && user.isAdmin === true) {
        //     res.send("Admin");
        // }
        else if (password === user.password) {
            let data = await Exams.find({ year: user.grade }).select({
                questions: 1,
                semester: 1,
                _id: -1,
                isShown: 1,
            });
            let semester1 = data.filter((el) => el.semester == "semester1");
            semester1 = semester1.filter((el) => el.isShown == true);
            let semester2 = data.filter((el) => el.semester == "semester2");
            semester2 = semester2.filter((el) => el.isShown == true);
            if (user.isAdmin) {
                res.send("Admin");
            } else {
                res.send({
                    text: "Not Admin",
                    data: {
                        semester1: semester1,
                        semester2: semester2,
                        name: user.name,
                        user,
                    },
                });
            }
        } else {
            res.send("Wrong Email Or Password");
        }
    }
};

module.exports = register;
