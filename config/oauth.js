const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/user")

//this attach user to req: req.user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user)=>{
    done(null, user)
  })
  
})


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/return"
    },
    function(accessToken, refreshToken, profile, done) {
      
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //already have the user
          //here we have to update user
          console.log(`user is: ${currentUser}`)
          done(null, currentUser)
        } else {
          //create user in db
          console.log(profile)
          new User({
            username: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
            picture: profile._json.picture
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
