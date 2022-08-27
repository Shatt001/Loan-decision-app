"use strict";

const { srv } = require("../server/server");
const { getDecision } = require("./services/decision");

srv.get("/getDecision", (req, res) => {
  res.send(getDecision(req.query.persCode, req.query.amount, req.query.period));
});
