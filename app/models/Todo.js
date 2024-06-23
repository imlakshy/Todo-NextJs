// models/Todo.js
import mongoose from "mongoose";

const getFormattedISTDate = () => new Date(Date.now() + 19800000).toISOString().replace('T', ', ').slice(0, 19).replace(/-/g, '/').replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$3/$2/$1');



const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        default: "Unkown",
        required: true
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: getFormattedISTDate
    }
},
    {
        collection: "Tasks"
    });

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
