var express = require('express');
var router = express.Router();
const validateUserData = require("../middlewares/validateUserData")
const Register = require("../controllers/RegisterController")
const deleteUser = require("../controllers/deleteUser")
/* GET home page. */
router.post('/',validateUserData,Register)
router.post('/deleteUser',deleteUser)



module.exports = router;
