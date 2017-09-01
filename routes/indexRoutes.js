const express = require("express");
const indexRoutes = express.Router();
const users = require("../data");

indexRoutes.get("/", (req, res) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    res.render("home", { user: req.user });
  }
});

module.exports = indexRoutes;
