import { Router } from "express";

const router = Router()


router.get('/', (req,res) =>{
    res.render('public/index')
})

router.get('/login',(req,res)=>{
    res.render('public/login')
})

router.get('/register',(req,res)=>{
    res.render('public/register')
})





export default router