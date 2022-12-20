import { request, Router } from "express";
import authControllers from "../controllers/authControllers.js";
import passport from "passport";

const {LogIn, Register} = authControllers

const router = Router()


// 1. submission of form
router.post("/register",Register);

  
router.post('/login',LogIn)

//reveals the consent screen and tell google we want to access user data
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

// the callback url after the user is granted access from the consent screen. 
router.get('/google/redirect', passport.authenticate('google', {
    successRedirect: '/todos'}))

router.post('/passport/login', passport.authenticate('local', {
    successRedirect: '/todos', 
    failureRedirect: '/login',
    failureFlash: true,
    successMessage: 'Welcome'}))

export default router;
