const db = require('../config').connection;

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  save() {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [this.username, this.password], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = User;
