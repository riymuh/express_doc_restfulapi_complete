const express = require("express");
const router = express.Router();
const path = require("path");
const employeeController = require("../../controllers/employeeController");

// router.get("/", (req, res) => {
//   //res.send("mantap");
//   res.json(data.employee);
// });

// router.post("/", (req, res) => {
//   res.json({
//     firstname: req.body.id,
//   });
// });

router.get("/", employeeController.getAllEmployees);

router.post("/", employeeController.addNewEmployee);

router.get("/:id", employeeController.getEmployee);

module.exports = router;
