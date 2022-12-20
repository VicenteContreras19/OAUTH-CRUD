import Todo from "../models/Todo.js";
import mongoose from "mongoose";

const controllers = {
  getAllTodos: (req, res) => {
    const { id } = req.user;
    Todo.find({ authorID: id })
      .sort({ createdAt: -1 })
      .lean()
      .then((todos) => {
        res.render("protected/profile", {
          user: req.user,
          todos,
        });
      })
      .catch((err) => res.status(400).json(err));
  },
  getSingleTodo: (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });

    Todo.findById(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ err: "No Todo found in db" });
        }
        if (req.user.id != todo.authorID) return res.sendStatus(401);

        res.status(200).render('protected/todo',{todo} )
      })
      .catch((err) => res.status(400).json(err));
  },
  createTodo: (req, res) => {
    const { title, description } = req.body;
    const { id: authorID } = req.user;
    if (!title || !description)
      return res.status(400).json({ err: "Please fill out a proper form" });

    Todo.create({ title, description, authorID })
      .then((todo) => {
        console.log(todo);
        res.status(200).json(todo);
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  updateTodo: (req, res) => {
    const { id } = req.params;
    const { id: authorID } = req.user;

    if (!req.body.title && !req.body.description) {
      return res.status(400).json({ err: "Invalid form body" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });

    Todo.findById(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ err: "No Todo found in db" });
        }
        if (req.user.id != todo.authorID) return res.sendStatus(401);

        Todo.findByIdAndUpdate(id, { ...req.body }, { new: true })
          .then((todo) => {
            res.redirect('/todos/' + todo.id);
          })
          .catch((err) => res.status(400).json({ err: err.message }));
      })
      .catch((err) => res.status(400).json({ err: err.message }));
  },
  deleteTodo: (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ err: "No Todo Found" });


      Todo.findById(id).then(todo=>{
        if (req.user.id != todo.authorID) return res.sendStatus(401);
        Todo.findByIdAndDelete(id)
        .then((todo) => {
          if (!todo) return res.status(404).json({ err: "No Todo Found" });
  
          res.redirect('/todos');
        })
        .catch((err) => res.status(400).json(err.message));
      }) 
  },
};

export default controllers;
