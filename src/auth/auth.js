import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

console.log("entered in auth");

passport.serializeUser((user, done) => {
  // Here, you typically store only the user's id in the session
  console.log(user.username)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
  let findUser;
  try {
    findUser = await User.findOne({ profileId: profile.id });
  } catch (error) {
    console.log("Error finding user in DB:", error);
    return done(error);
  }

  try {
    if (!findUser) {
      const newUser = new User({
        username: profile.displayName,
        email: profile.emails ? profile.emails[0].value : null,
        profileId: profile.id
      });

      console.log("Data of a user we are sending in database: ", newUser);

      const savedUser = await newUser.save();
      console.log("User saved to database:", savedUser);
      return done(null, savedUser);
    } else {
      console.log("User already exists in the database.");
      return done(null, findUser);
    }
  } catch (error) {
    console.log("Error creating/saving user data in database:", error);
    return done(error);
  }
}));

export default passport;
