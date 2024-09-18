const db = require('../config').connection;

class Note {
  constructor(userId, title, content) {
    this.userId = userId;
    this.title = title;
    this.content = content;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)', [this.userId, this.title, this.content], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static getByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM notes WHERE user_id = ?', [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Note;
