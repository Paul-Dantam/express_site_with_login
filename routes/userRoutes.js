const express = require("express");
const userRoutes = express.Router();

userRoutes.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = userRoutes;
