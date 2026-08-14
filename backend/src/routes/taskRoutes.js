import express from 'express';
import {createTask, deleteTask, getTask, getTasks, moveTask, updateTask} from '../controllers/taskController.js';
const taskRouter = express.Router();

taskRouter.get('/',getTasks);
taskRouter.get("/:id",getTask);
taskRouter.post('/',createTask);
taskRouter.put('/:id',updateTask);
taskRouter.delete('/:id',deleteTask);
taskRouter.patch("/:id/move",moveTask);

export default taskRouter;