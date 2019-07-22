var express = require('express');
var router = express.Router();
const passport = require("passport")

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', function(req, res, next) {
  res.render('home', { user: req.user });
});

router.get("/login", function(req, res) {
  res.render("login")
})

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/return",
  passport.authenticate("google", { failureRedirect: "/login" }), //??? this is a middleware
  function(req, res) {
    res.redirect("/")
  }
)

router.get(
  "/profile", 
  require("connect-ensure-login").ensureLoggedIn(),
  function(req,res) {
    res.render("profile", { user: req.user })
  }
)

module.exports = router;
