import { Router } from "express";
import mongoose from "mongoose";
import controllers from "../controllers/controllers.js";
import upload from "../middleware/multer.js";
import { passportAuth } from "../middleware/passportAuth.js";
//import isAuthenticated, { jwtAuth } from "../middleware/auth.js";



const{getAllTodos, getSingleTodo, createTodo, updateTodo, deleteTodo} = controllers

const router = Router()

//router.use(isAuth)
// router.use(jwtAuth)
router.use(passportAuth)

// create a todo
router.post('/',createTodo);
// get ALL Todos
router.get('/', getAllTodos);


// a single todo
router.get('/:id', getSingleTodo)


// update a todo
router.put('/:id', updateTodo)
    

// delete a todo
router.delete('/:id', deleteTodo)

router.post('/profilepic', upload.single('image'), (req,res) =>{

})

export default router