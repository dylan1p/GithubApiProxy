const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");

const app = express();

mongoose.connect(config.mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("App listening on port 3000!");
});
