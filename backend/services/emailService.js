const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset',
    text: `Reset your password using the link: ${resetUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
