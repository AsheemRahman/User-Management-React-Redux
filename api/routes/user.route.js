import express from 'express';
import {updateUser,deleteUser,} from '../controllers/User/user.controller.js';
import { verifyToken } from '../Middleware/UserVerify.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);

router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
