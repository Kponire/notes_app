const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetUrl) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"NoteMaster" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Password Reset - NoteMaster',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
          <h1 style="color: teal; text-align: center; font-size: 28px;">NoteMaster</h1>
          <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;">
            Hello, 
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;">
            You requested a password reset for your NoteMaster account. 
            Click the button below to reset your password:
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${resetUrl}" 
               style="background-color: teal; color: white; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px;">
              Reset Password
            </a>
          </div>
          <p style="color: #555; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            If you didn't request a password reset, please ignore this email or contact support if you have any concerns.
          </p>
          <p style="color: teal; font-size: 16px; font-weight: bold; text-align: center; margin-top: 20px;">
            Keep organizing your notes securely with NoteMaster!
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #777; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} NoteMaster. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendReminderEmail = async (to, noteTitle, content) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"NoteMaster" <${process.env.SMTP_USER}>`,
    to,
    subject: `Reminder: ${noteTitle} - NoteMaster`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
          <h1 style="color: teal; text-align: center; font-size: 28px;">NoteMaster Reminder</h1>
          <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;">
            You have a reminder for your note: <strong>${noteTitle}</strong>.
          </p>
          ${content}
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #777; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} NoteMaster. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail, sendReminderEmail };
