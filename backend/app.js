var express = require('express');
require('dotenv').config()
var cookieParser = require('cookie-parser');
const mongoose = require("mongoose")
const cors = require("cors")
var Register = require('./routes/Register');
var Exams = require('./routes/Exams');
var UserRouter = require('./routes/UserRouter');
const PORT = process.env.PORT


var app = express();

var path = require('path');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(Register);
app.use(Exams);
app.use(UserRouter);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/EnglishCourse").then(()=>{
	  console.log("DB is working")
}).catch((err)=>{
	  console.log(err)
})

if(process.env.NODE_ENV === "production"){
  app.use(express.static('public'))

  app.get('/' , (req,res)=>res.sendFile(__dirname + "/public/index.html"))
}



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(PORT || 5000)

module.exports = app;
