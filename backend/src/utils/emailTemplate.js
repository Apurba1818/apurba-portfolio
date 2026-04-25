const generateEmailTemplate = (name, email, message) => {
  return `
    <div style="font-family: sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #22d3ee;">New Message from Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <div style="margin-top: 20px; padding: 15px; background-color: #f4f4f4; border-radius: 8px;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;" />
      <p style="font-size: 12px; color: #999;">Sent from your Portfolio Contact Form.</p>
    </div>
  `;
};

module.exports = { generateEmailTemplate };