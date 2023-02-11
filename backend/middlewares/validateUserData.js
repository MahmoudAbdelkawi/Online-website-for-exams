const validator = require('../utils/signupValidation')
const validateUserData = (req,res,next) =>{
    if (validator({email :req.body.email ,name:req.body.name , password:req.body.password })) {
        next()
    }
    else
        res.send(false)
} 

module.exports = validateUserData