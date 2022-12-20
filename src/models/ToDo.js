import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const TodoSchema = new Schema({
    title:{
        type: String,
        default: new Date(),
    },
    description: {
        type:String, 
        required: true
    },
    authorID: {

        type: mongoose.Types.ObjectId,
        required: true
      }

    
}, {timestamps: true})

export default model('Todo', TodoSchema)