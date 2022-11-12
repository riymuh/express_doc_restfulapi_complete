const { nextDay } = require("date-fns");
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;
const cors = require("cors");

//custom middleware
// app.use((req, res, next) => {
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
//   console.log(`${req.method}`);
//   next();
// });
//anonymous function app.use(test())
app.use(logger);
//cross origin resource sharing
const whitelist = [
  //"https://www.google.com",
  "http://127.0.0.1:3500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

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

app.use(errorHandler);

app.listen(PORT, () => console.log("server is running"));
