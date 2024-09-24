const { connectDB } = require('../config');
const db = connectDB;
const Note = require('../models/noteModel');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Note.getCategory(req.user.id);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};


exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id; // Assuming user ID is available via authentication middleware

  try {
    // Insert category along with the user ID
    await db.execute('INSERT INTO categories (name, user_id) VALUES (?, ?)', [name, userId]);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Category name already exists' });
    } else {
      res.status(500).json({ message: 'Error creating category' });
    }
  }
};

exports.updateCategory = async (req, res) => {
  const { id, name } = req.body;
  const userId = req.user.id;

  try {
    const result = await db.execute('UPDATE categories SET name = ? WHERE id = ? AND user_id = ?', [name, id, userId]);
    const affectedRows = result?.[0]?.affectedRows;
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found or unauthorized' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error updating category' });
  }
};

