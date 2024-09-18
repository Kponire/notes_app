const Note = require('../models/noteModel');

exports.getNotes = async (req, res) => {
  const notes = await Note.getByUserId(req.user.id);
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note(req.user.id, title, content);
  await newNote.save();
  res.status(201).json({ message: 'Note created successfully' });
};
