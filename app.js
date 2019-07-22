require("dotenv").config()

const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const passport = require("passport")
const passportSetup = require("./config/oauth")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")

//Routes
const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")

const app = express()

// view engine setup
app.set("views", [path.join(__dirname, "views")])
app.set("view engine", "ejs")

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 100,
    keys: [process.env.COOKIE_KEY]
  })
)

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongoDB.")
})

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"))
app.use(require("cookie-parser")())
app.use(require("body-parser").urlencoded({ extended: true }))
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
