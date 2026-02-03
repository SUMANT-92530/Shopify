import express from 'express';
import { signUp, login } from '../controllers/authControllers.js';

const router = express.Router();

// Route for user sign-up
router.post('/signup', signUp);

// Route for user login
router.post('/login', login);

export default router;