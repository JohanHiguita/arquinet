var express = require("express")
var router = express.Router()
const passport = require("passport")

/* Auth Routes */

router.get(
  "/",
  require("connect-ensure-login").ensureLoggedIn(),
  (req, res) => {
    res.render("index", { user: req.user })
  }
)

router.get("/login", function(req, res) {
  res.render("login")
})

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
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
  function(req, res) {
    console.log(req.user)
    res.render("profile", { user: req.user })
  }
)

module.exports = router
