const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//routers
const subdir = require("./routes/subdir");
const employee = require("./routes/api/employee");

//custom middleware
// app.use((req, res, next) => {
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
//   console.log(`${req.method}`);
//   next();
// });
//anonymous function app.use(test())
app.use(logger);

//cross origin resource sharing
app.use(cors(corsOptions));

//with router
app.use("/subdir", subdir);
app.use("/employee", employee);

app.get("/", (req, res) => {
  //res.send("hello world");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/home", (req, res) => {
  res.send("ini home");
});

app.get("/redirect", (req, res) => {
  res.redirect("/home");
});

app.get(
  "/next",
  (req, res, next) => {
    console.log("next");
    next();
  },
  (req, res) => {
    res.send("next request");
  }
);

app.get("/*", (req, res) => {
  res.status(404).send("404");
});

// app.all("*", (req, res) => {
//   res.status(404).send("404");
// });

app.use(errorHandler);

app.listen(PORT, () => console.log("server is running"));
