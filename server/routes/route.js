import express from 'express'
import { signup, login, checkAuth } from '../controllers/authController.js';
import { verifyToken } from './../middlewares/verifyToken.js';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();
router.post("/signup", signup)
router.post("/login", login)
router.get("/checkAuth", verifyToken, checkAuth)


// user 
router.get("/getUsers", getUsers)
export {router}
