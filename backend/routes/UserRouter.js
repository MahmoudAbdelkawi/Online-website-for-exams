var express = require("express");
const {
  getUserOfThisYear,
  getAllUsers,
  getUserData,
  updateDegree
} = require("../controllers/getUserOfThisYear");

var router = express.Router();

router.post("/getUserOfThisYear", getUserOfThisYear);
router.post("/getAllUsers", getAllUsers);
router.post("/getUserData", getUserData);
router.post("/updateDegree", updateDegree);

module.exports = router;
