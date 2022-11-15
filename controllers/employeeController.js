const data = {};
data.employee = require("../data/employee.json");

const getAllEmployees = (req, res) => {
  res.json(data.employee);
};

const addNewEmployee = (req, res) => {
  res.json(req.body);
};

const getEmployee = (req, res) => {
  res.json(req.params.id);
};

module.exports = { getAllEmployees, addNewEmployee, getEmployee };
