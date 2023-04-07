const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// const auth = require('../routes/auth');

const login = require("../routes/login.js");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("tiny"));
  app.use(
    cors({
      origin: "https://localhost:4000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
      credentials: true,
    })
  );
  app.use(express.static("../client/build"));
  // app.use('/api/auth', auth);

  app.use("/api/login", login);
};
