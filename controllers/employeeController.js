const data = {
  employees: require("../models/employee.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const addNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({
      message: "first and last names are required",
      data: newEmployee,
    });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  let employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  res.json(employee);
};

const updateEmployee = (req, res) => {
  let employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );

  employee.firstname = req.body.firstname;
  employee.lastname = req.body.lastname;

  data.employees[employee.id] = employee;

  res.json(data.employees);
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  getEmployee,
  updateEmployee,
};
