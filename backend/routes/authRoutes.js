const express = require('express');
const { register, login, forgotPassword, resetPassword, getUser } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.get('/me', verifyToken,  getUser);

module.exports = router;
