const express = require('express');
const {
  getReminders,
  getArchivedNotes,
  getTrashNotes,
  getPinnedNotes,
  setPinNote,
  setArchiveNote,
  setReminder,
  setTrash,
} = require('../controllers/noteController');  // Make sure the path is correct
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/reminders', verifyToken, getReminders);
router.get('/archive', verifyToken, getArchivedNotes);
router.get('/trash', verifyToken, getTrashNotes);
router.get('/pinned', verifyToken, getPinnedNotes);
router.put('/pinned/:id', verifyToken, setPinNote);
router.put('/trash/:id', verifyToken, setTrash);
router.put('/archive/:id', verifyToken, setArchiveNote);
router.put('/reminders/:id', verifyToken, setReminder);

module.exports = router;
