const express = require('express');
const { getNotes, createNote } = require('../controllers/noteController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.post('/', verifyToken, createNote);

module.exports = router;
