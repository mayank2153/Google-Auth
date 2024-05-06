import { Router } from "express";
import passport from "passport";
import session from "express-session";
import { User } from "../models/user.model.js";
const router=Router()

router.route('/auth/google').get(passport.authenticate('google', { scope: ['email'] }))

router.route('/auth/google/callback').get(passport.authenticate('google'),
function(req, res) {
  // Successful authentication, redirect home.
//   console.log(req.)
  res.send('Chal gya');
})

router.route("/profile").get(async(req,res)=>{
    console.log("this is req user",req.user)
    res.send("Profile")
})

export default router