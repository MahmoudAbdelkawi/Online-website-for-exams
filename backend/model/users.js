const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  grade: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean,
  exams: Array,
});

// exams => exam + (taken?, degree?)

const users = mongoose.model("Users", schema);

module.exports = users;
