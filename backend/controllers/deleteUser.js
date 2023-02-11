const Users = require('../model/users')
const { getAllUsers } = require('./getUserOfThisYear')
const deleteUser  = async(req,res)=>{
    await Users.deleteOne({_id:req.body.id})
}

module.exports = deleteUser