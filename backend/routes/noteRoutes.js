const express = require('express');
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.get('/:id', verifyToken, getNoteById);
router.post('/', verifyToken, createNote);
router.put('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote);

module.exports = router;
