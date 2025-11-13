import express from 'express';
import { register , login } from '../controller/user.controller.js';
import checkJwt from '../middelware/checkJwt.middelware.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);

export default router;