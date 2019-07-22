const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/user")

console.log("data: "+process.env.GOOGLE_CLIENT_ID)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/return"
    },
    function(accessToken, refreshToken, profile, done) {
      /* User.findOrCreate({ googleId: profile.id }, function(err, user) {
          return done(err, user)
        }) */
      //console.log(profile)
      //check if user already exist in db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //already have the user
          console.log(`user is: ${currentUser}`)
          done(null, currentUser)
        } else {

          //create user in db
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created: " + newUser)
              done(null, newUser)
            })
        }
      })
      //return done(null, profile)
    }
  )
)


//this attach user to req: req.user
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
done(null, obj)
})
