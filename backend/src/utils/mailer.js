const nodemailer = require('nodemailer');

/**
 * Configure the transporter using Gmail settings.
 * Ensure EMAIL_USER and EMAIL_PASS are set in your .env file.
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use the 16-character App Password from Google
  }
});

/**
 * Utility function to send emails.
 * @param {Object} mailOptions - Object containing to, subject, html, etc.
 * @returns {Promise}
 */
const sendEmail = (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };