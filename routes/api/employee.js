const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
data.employee = require("../../data/employee.json");

router.get("/", (req, res) => {
  //res.send("mantap");
  res.json(data.employee);
});

router.post("/", (req, res) => {
  res.json({
    firstname: req.body.id,
  });
});

module.exports = router;
