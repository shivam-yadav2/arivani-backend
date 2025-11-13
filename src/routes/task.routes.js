import express from 'express';
import { createTask ,getAllTasks ,getById ,deleteTask ,editTask} from '../controller/task.controller.js';
import checkJwt from '../middelware/checkJwt.middelware.js';

const router = express.Router();

router.post('/create-task',checkJwt, createTask);
router.get('/get-task',checkJwt, getAllTasks);
router.get('/get-task/:id',checkJwt, getById);
router.get('/delete-task/:id',checkJwt, deleteTask);
router.put('/edit-task/:id', checkJwt, editTask);

export default router;