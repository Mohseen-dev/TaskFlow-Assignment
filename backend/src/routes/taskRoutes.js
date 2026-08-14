import express from 'express';
import {createTask, deleteTask, getTask, getTasks, moveTask, updateTask} from '../controllers/taskController.js';
import validateTask from '../middleware/validateTask.js';
const taskRouter = express.Router();

taskRouter.get('/',getTasks);
taskRouter.get("/:id",getTask);
taskRouter.post('/',validateTask,createTask);
taskRouter.put('/:id',validateTask ,updateTask);
taskRouter.delete('/:id',deleteTask);
taskRouter.patch("/:id/move",moveTask);

export default taskRouter;