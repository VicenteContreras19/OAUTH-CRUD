import bcrypt from 'bcrypt'
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';



//Creates a cookie containing the User ID
passport.serializeUser((user,done)=>{
    done(null, user.id)
})


passport.use(new GoogleStrategy({

    // clientID should be working with env but theres an issue so we going in raw
    clientID: '560242757123-fp18jlhgshciln4q2pl2qbhenmdvq0k1.apps.googleusercontent.com',
    clientSecret:'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', 
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)

    User.findOne({$or:[{email: profile._json.email},{googleID: profile.id}]}).then(user => {
        if(user) return done(null, user)

        User.create({googleID: profile.id, displayName: profile.displayName, profilePic: profile._json.picture}).then(user =>{
           return  done(null, user)
        }).catch(err => done(err,false))
    }).catch(err => done(err,false))
}))


// When a subsequent request returns to us, we take the id inside the cookie, search the DB, and populate req.user with the user details
passport.deserializeUser((id, done)=> {
    User.findById(id).then(user =>{
        if(!user)return done(null, false)

         done(null,user)

    }).catch(err=>done(err,false))
})














passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    console.log(email);

    if(!email ||!password ) done(null, false, {message: 'Invalid form'})

    User.findOne({email}).then(user=>{
        if(!user) return done(null, false, {message: 'Email not registered'})

        bcrypt.compare(password, user.password).then(isMatch=>{
            if(!isMatch) return done(null, false, {message: 'invalid credentials'})
            done(null, user, {message: 'Welcome to the mf club doggy we got royal D\'Useé VSOP over there, fresh R&J\'s and the bitches on they way '})
            console.log('Welcome to the mf club doggy we got royal D\'Useé VSOP over there, fresh R&J\'s and the bitches on they way')
        }).catch((err)=> done(err,false))
    }).catch((err)=> done(err,false))
}))