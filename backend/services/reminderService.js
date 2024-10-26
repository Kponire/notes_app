const Note = require('../models/noteModel');
const emailService = require('./emailService');

const checkReminders = async () => {
  try {

    const reminders = await Note.getDueReminders();

    for (const reminder of reminders) {
      const { id, user_id, title, reminder: reminderDate } = reminder;

      // Send the reminder email
      const user = await Note.getUserById(user_id);
      const emailContent = `
        <p>Hello,</p>
        <p>This is a reminder for your note: <strong>${title}</strong>.</p>
        <p>Reminder set for: ${new Date(reminderDate).toLocaleString()}</p>
        <p>Keep up with your tasks!</p>
      `;

      await emailService.sendReminderEmail(user.email, title, emailContent);

      // Set the reminder to null after sending the email
      await Note.clearReminder(id, user_id);
    }
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
};

setInterval(checkReminders, 10000);

module.exports = { checkReminders };
