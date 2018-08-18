const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();

mongoose.connect(config.mongoDB);

app
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use("/api/local-user", require("./api/localUser"));

app.listen(config.PORT, () => {
  console.debug("App listening on port 3000!");
});

module.exports = app;
