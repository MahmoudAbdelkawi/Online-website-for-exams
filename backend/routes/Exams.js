var express = require('express');
const addExam = require('../middlewares/addExam');
const sendExams = require('../controllers/sendExams');
const {deleteExam,deleteQuestion,updateExam,shownExams} = require("../controllers/deleteExam")
var router = express.Router();


router.post('/addExams',addExam)
router.post('/allExams',sendExams)
router.post('/deleteExam',deleteExam)
router.post('/updateExam',updateExam)
router.post('/deleteQuestion',deleteQuestion)
router.post('/shownExams',shownExams)




module.exports = router;
