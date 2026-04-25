const { sendEmail } = require('../utils/mailer');
const { generateEmailTemplate } = require('../utils/emailTemplate');

// This is a standard function, NOT a router call
const handleContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("📩 Data received:", { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const htmlContent = generateEmailTemplate(name, email, message);

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Message: ${message}`, // Plain text version
      html: htmlContent           // HTML version
    };

    await sendEmail(mailOptions);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Exporting the function so the Router can use it
module.exports = { handleContactForm };