const express = require("express");

const { getAlldata } = require("../controllers/data.js");
const router = express.Router();
router.route('/data').get(getAlldata)

module.exports = router
