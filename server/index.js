const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const Constellation = require("../database/models/constellation");
require("../database");

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("common"));

app.get("/api/constellations", (req, res) => {
  console.log(req.originalUrl);
  Constellation.find()
    .then((constellations) => res.send(constellations))
    .catch((error) => res.status(500).send(error));
});

app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.send({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
