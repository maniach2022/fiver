const express = require("express");
// const guard = require('express-jwt-permissions')();
const moment = require("moment");
const _ = require("lodash");
const { istesting } = require("../udp-server/env.js");

const router = express.Router();
router.post("/connect", async (req, res) => {
  if (istesting) {
    console.log("Testing");
    return res.status(200).json({ testing: true });
  }
  const { getLoginData } = require("../udp-server/login.js");
  try {
    const data = await getLoginData(req.body);
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    //console.log("Error from login");
    return res.status(400).json("Error in getLoginData");
  }
  // console.log(data);
});

module.exports = router;
