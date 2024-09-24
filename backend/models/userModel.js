// userModel.js
const { connectDB } = require('../config');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [this.username, this.email, this.password],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static findById(userId) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'SELECT * FROM users WHERE id = ?',
        [userId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static setResetToken(userId, resetToken, resetTokenExpires) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
        [resetToken, resetTokenExpires, userId],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static findByResetToken(resetToken) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'SELECT * FROM users WHERE reset_token = ?',
        [resetToken],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static updatePassword(userId, newPassword) {
    return new Promise((resolve, reject) => {
      connectDB.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
        [newPassword, userId],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }
}

module.exports = User;
