import express from 'express';
import { addUser, adminLogin, deleteUser, getUsers, editUser, signout } from '../controllers/Admin/admin.controller.js';
import { adminVerify } from '../Middleware/AdminVerify.js';

const router = express.Router();


router.post('/login', adminLogin);

router.get('/getuser', adminVerify, getUsers);

router.post('/adduser', adminVerify, addUser);

router.post('/edituser/:id', adminVerify, editUser);

router.post('/deleteuser/:id', adminVerify, deleteUser);

router.post('/signout', signout);


export default router;