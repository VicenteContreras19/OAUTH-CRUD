import validator from "validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
//import jwt from 'jsonwebtoken'; 


const authControllers = {


    Register: (req, res) => {

      const errors = []

        const { email, password, confirmPassword } = req.body;
      
        if (!email || !password || !confirmPassword)
          errors.push({ err: "Invalid form" });
        if (password !== confirmPassword)
          errors.push({ err: "Passwords do not match" });
        if (!validator.isEmail(email))
          errors.push({ err: "Invalid email" });
      
    
          // 2. search the db if user already exists
    
        User.findOne({ email }).then((user) => {
          if (user){
          errors.push({ err: "Email already registered" });
          }

          if (errors.length){
            req.flash('error', errors)
          return res.redirect('/register')
          }
          // 3. hash password
          bcrypt
            .genSalt()
            .then((salt) => {
              bcrypt
                .hash(password, salt)
                .then((hash) => {
    
                  // 4. create user
                  User.create({ email, password: hash })
                    .then((user) => res.status(200).json({user}))
                    .catch((err) => res.status(500).json({ err: err.message }));
                })
                .catch((err) => res.status(500).json({ err: err.message }));
            })
            .catch((err) => res.status(500).json({ err: err.message }));
        });
      }, 


      LogIn: (req,res)=>{
        const {email, password} = req.body
        if (!email || !password)
          return res.status(400).json({ err: "Invalid form" });
         if (!validator.isEmail(email))
          return res.status(400).json({ err: "Invalid email" });
    
          
          User.findOne({email}).then(user => {
            if (!user) return res.status(400).json({ err: "Email not registered" });
    
            bcrypt.compare(password,user.password).then(isMatch => {
              if(!isMatch)
                return res.sendStatus(401)
    
              // req.session.user = user


              //JWT example
              // const token = jwt.sign({email:user.email, id: user.id},  process.env.JWT_SECRET, {expiresIn: '10d'})
    
              // res.cookie('token' , token)
              // res.redirect('/todos')
            })
    
          })
      }


}

export default authControllers