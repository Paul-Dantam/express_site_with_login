const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const mustacheExpress = require("mustache-express");
const path = require("path");
const users = require("./data");
const checkAuth = require("./middlewares/checkAuth");
const sessionConfig = require("./sessionConfig");
const indexRoutes = require("./routes/indexRoutes")
const app = expresss();

const port = process.env.PORT || 8000;

app.engine("mustache", mustacheExpress());
app.use("views", "./views");
app.use("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));(
app.us("/", indexRoutes)

app.get("/", (req, res) => {
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

app.post("/signup", (req, res) => {
  users.push(req.body);
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
