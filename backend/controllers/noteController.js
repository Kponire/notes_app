const Note = require('../models/noteModel');

// Get all notes for the authenticated user
exports.getNotes = async (req, res) => {
  try {
    const { category } = req?.query;
    const notes = await Note.getByUserId(req.user.id, category);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to retrieve notes' });
  }
};

// Get a single note by note ID for the authenticated user
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.getById(req.params.id, req.user.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Failed to retrieve note' });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  const { title, content, tags, color, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  try {
    const newNote = new Note(req.user.id, title, content, tags, color, category);
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully' });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// Update an existing note
exports.updateNote = async (req, res) => {
  const { title, content, tags, color, category } = req.body;
  try {
    const updatedNote = await Note.update(req.params.id, req.user.id, title, content, tags, color, category);
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }
    res.json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const result = await Note.delete(req.params.id, req.user.id);
    if (!result) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};

// Get all reminders for the authenticated user
exports.getReminders = async (req, res) => {
  try {
    const { category } = req?.query;
    const reminders = await Note.getRemindersByUserId(req.user.id, category);
    res.json(reminders);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ message: 'Failed to retrieve reminders' });
  }
};

// Get all archived notes for the authenticated user
exports.getArchivedNotes = async (req, res) => {
  try {
    const { category } = req?.query;
    const archivedNotes = await Note.getArchivedByUserId(req.user.id, category);
    res.json(archivedNotes);
  } catch (error) {
    console.error('Error fetching archived notes:', error);
    res.status(500).json({ message: 'Failed to retrieve archived notes' });
  }
};

// Get all deleted notes (Trash) for the authenticated user
exports.getTrashNotes = async (req, res) => {
  try {
    const { category } = req?.query;
    const trashNotes = await Note.getDeletedByUserId(req.user.id, category);
    res.json(trashNotes);
  } catch (error) {
    console.error('Error fetching trash notes:', error);
    res.status(500).json({ message: 'Failed to retrieve trash notes' });
  }
};

// Get all pinned notes for the authenticated user
exports.getPinnedNotes = async (req, res) => {
  try {
    const { category } = req?.query;
    const pinnedNotes = await Note.getPinnedByUserId(req.user.id, category);
    res.json(pinnedNotes);
  } catch (error) {
    console.error('Error fetching pinned notes:', error);
    res.status(500).json({ message: 'Failed to retrieve pinned notes' });
  }
};

// Pin or unpin a note
exports.setPinNote = async (req, res) => {
  const { is_pinned } = req.body;
  try {
    const result = await Note.setPinStatus(req.params.id, req.user.id, is_pinned);
    res.json({ message: 'Note pin status updated' });
  } catch (error) {
    console.error('Error updating pin status:', error);
    res.status(500).json({ message: 'Failed to update pin status' });
  }
};

// Archive or unarchive a note
exports.setArchiveNote = async (req, res) => {
  const { is_archived } = req.body;
  try {
    const result = await Note.setArchiveStatus(req.params.id, req.user.id, is_archived);
    res.json({ message: 'Note archive status updated' });
  } catch (error) {
    console.error('Error updating archive status:', error);
    res.status(500).json({ message: 'Failed to update archive status' });
  }
};

// Set a reminder for a note
exports.setReminder = async (req, res) => {
  const { is_reminder_set } = req.body;
  console.log(req.params.id, is_reminder_set, req.user.id);
  try {
    const result = await Note.setReminder(req.params.id, req.user.id, is_reminder_set);
    if (result) {
      res.json({ message: 'Reminder set successfully' });
    } else {
      res.status(404).json({ message: 'Note not found or reminder not updated' });
    }
  } catch (error) {
    console.error('Error setting reminder:', error);
    res.status(500).json({ message: 'Failed to set reminder' });
  }
};

// Set a trash for a note
exports.setTrash = async (req, res) => {
  const { is_trash } = req.body;
  try {
    const result = await Note.setTrashStatus(req.params.id, req.user.id, is_trash);
    res.json({ message: 'Trash set successfully' });
  } catch (error) {
    console.error('Error setting trash:', error);
    res.status(500).json({ message: 'Failed to set trash' });
  }
};
