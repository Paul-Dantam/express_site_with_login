const express = require("express");
const authRoutes = express.Router();
const users = require("../data");

authRoutes.post("/signup", (req, res) => {
  users.push(req.body);
  res.redirect("/auth/login");
});

authRoutes.get("/signup", (req, res) => {
  res.render("signup");
});

authRoutes.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

authRoutes.post("/login", (req, res) => {
  let reqUsername = req.body.username;
  let reqPassword = req.body.password;
  let foundUser = users.find(user => user.username === reqUsername);
  if (!foundUser) {
    return res.render("login", { errors: ["Please log in"] });
  }
  if (foundUser.password === reqPassword) {
    req.session.user = foundUser;
    res.redirect("/");
  } else {
    return res.render("login", { errors: ["Password does not match."] });
  }
});

module.exports = authRoutes;
