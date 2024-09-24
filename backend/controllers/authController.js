const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/userModel');
const { sendResetEmail } = require('../services/emailService');

exports.register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(username, email, hashedPassword);
  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //const user = await User.findByUsername(username);
  const user = await User.findByEmail(email);
  console.log(user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '10h',
  });
  res.json({ token });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpires = new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' '); // 1 hour

  await User.setResetToken(user.id, resetToken, resetTokenExpires);

  const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
  console.log(resetUrl);
  //await sendResetEmail(user.email, resetUrl);

  res.json({ message: 'Password reset link sent to your email' });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findByResetToken(token);
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or expired' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.updatePassword(user.id, hashedPassword);
  res.json({ message: 'Password reset successful' });
};
