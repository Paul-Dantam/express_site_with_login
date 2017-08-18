const express = require("express");
const Router = express.Router();

indexRoutes.get((req, res) => {
  let reqUsername = req.body.username;
  let reqPassword = req.body.password;

  let foundUser = users.find(user => user.username === reqUsername);
  if (!foundUser) {
    return res.render("login", { errors: ["Please Log in"] });
  }

  if (foundUser.password === reqPassword) {
    delete foundUser.password;
    req.session.user = foundUser;
    res.redirect("/");
  } else {
    return res.render("login", { errors: ["Password does not match."] });
  }

  res.render("home");
});

module.exports = indexRoutes;
