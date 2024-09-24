const { connectDB } = require('../config');

class Note {
  constructor(userId, title, content, tags = [], color = '#cc2121', category = 0) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.tags = tags.join(',');
    this.color = color;
    this.category = category
  }

  // Save a new note
  save() {
    return new Promise((resolve, reject) => {
      if (this.category) {
        connectDB.query(
          'INSERT INTO notes (user_id, title, content, tags, background_color, category_id) VALUES (?, ?, ?, ?, ?, ?)',
          [this.userId, this.title, this.content, this.tags, this.color, this.category],
          (err) => {
            if (err) reject(err);
            resolve();
          }
        );
      } else {
        connectDB.query(
          'INSERT INTO notes (user_id, title, content, tags, background_color) VALUES (?, ?, ?, ?, ?)',
          [this.userId, this.title, this.content, this.tags, this.color, this.category],
          (err) => {
            if (err) reject(err);
            resolve();
          }
        );
      }
    });
  }

  static getCategory(userId) {
    return new Promise((resolve, reject) => {
      connectDB.query('SELECT * FROM categories WHERE user_id = ?', [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get all notes by user ID
  static getByUserId(userId, category = null) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM notes WHERE user_id = ?';
      let queryParams = [userId];
      if (category && category !== 'All') {
        query += ' AND category_id = ?';
        queryParams.push(category);
      }
      connectDB.query(query, queryParams, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get reminders by user ID
  static getRemindersByUserId(userId, category = null) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM notes WHERE user_id = ? AND reminder IS NOT NULL';
      let queryParams = [userId];
      if (category && category !== 'All') {
        query += ' AND category_id = ?';
        queryParams.push(category);
      }
      connectDB.query(
        query, queryParams,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  // Get archived notes by user ID
  static getArchivedByUserId(userId, category = null) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM notes WHERE user_id = ? AND archived = TRUE';
      let queryParams = [userId];
      if (category && category !== 'All') {
        query += ' AND category_id = ?';
        queryParams.push(category);
      }
      connectDB.query(
        query, queryParams,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  // Get deleted notes (Trash) by user ID
  static getDeletedByUserId(userId, category = null) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM notes WHERE user_id = ? AND trash = TRUE';
      let queryParams = [userId];
      if (category && category !== 'All') {
        query += ' AND category_id = ?';
        queryParams.push(category);
      }
      connectDB.query(
        query, queryParams,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  // Get pinned notes by user ID
  static getPinnedByUserId(userId, category = null) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM notes WHERE user_id = ? AND pinned = TRUE';
      let queryParams = [userId];
      if (category && category !== 'All') {
        query += ' AND category_id = ?';
        queryParams.push(category);
      }
      connectDB.query(
        query, queryParams,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  // Get a single note by note ID and user ID
  static getById(noteId, userId) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'SELECT * FROM notes WHERE id = ? AND user_id = ?',
        [noteId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result[0]);
        }
      );
    });
  }

  // Update a note
  static update(noteId, userId, title, content, tags = [], color = '#cc2121', category) {
    console.log(category);
    return new Promise((resolve, reject) => {
      if (!category) {
        connectDB.query(
          'UPDATE notes SET title = ?, content = ?, tags = ?, background_color = ? WHERE id = ? AND user_id = ?',
          [title, content, tags.join(','), color, noteId, userId],
          (err, result) => {
            if (err) reject(err);
            resolve(result.affectedRows > 0);
          }
        );
      } else {
        connectDB.query(
          'UPDATE notes SET title = ?, content = ?, tags = ?, background_color = ?, category_id = ? WHERE id = ? AND user_id = ?',
          [title, content, tags.join(','), color, category, noteId, userId],
          (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
          }
        );
      }
    });
  }

  //update achive
  static setArchiveStatus(noteId, userId, isArchived) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'UPDATE notes SET archived = ? WHERE id = ? AND user_id = ?',
        [isArchived, noteId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }

  //update pinStatus
  static setPinStatus(noteId, userId, isPinned) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'UPDATE notes SET pinned = ? WHERE id = ? AND user_id = ?',
        [isPinned, noteId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }

   //update reminderStatus
   static setReminder(noteId, userId, reminderDate) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'UPDATE notes SET reminder = ? WHERE id = ? AND user_id = ?',
        [reminderDate, noteId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }

  //update trashStatus
  static setTrashStatus(noteId, userId, isTrash) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'UPDATE notes SET trash = ? WHERE id = ? AND user_id = ?',
        [isTrash, noteId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }


  // Delete a note by ID and user ID
  static delete(noteId, userId) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'DELETE FROM notes WHERE id = ? AND user_id = ?',
        [noteId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Note;
