import express from 'express';
import { signUp, login } from '../controllers/authControllers.js';
import {sendOtp} from '../controllers/sendOtpController.js';

const router = express.Router();

// Route for user sign-up
router.post('/signup', signUp);

// Route for sending OTP
router.post('/sendotp', sendOtp);

// Route for user login
router.post('/login', login);

export default router;