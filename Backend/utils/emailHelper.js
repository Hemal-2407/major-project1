const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your system email
    pass: process.env.EMAIL_PASS, // Your Google App Password
  },
});

// Function 1: New Survey Alert (For Customer Leads)
const sendSurveyAlert = async (surveyData) => {
  const mailOptions = {
    from: `"TasauPVC Web Portal" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_RECEIVER, 
    subject: `📞 New Survey Request: ${surveyData.name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #f59e0b;">New Technical Visit Requested</h2>
        <p><strong>Customer:</strong> ${surveyData.name}</p>
        <p><strong>Phone:</strong> ${surveyData.phone}</p>
        <p><strong>Product:</strong> ${surveyData.productName}</p>
        <p><strong>Address:</strong> ${surveyData.address}</p>
      </div>
    `,
  };
  return await transporter.sendMail(mailOptions);
};

// Function 2: Admin Login Alert (Security Notification)
const sendAdminLoginAlert = async (adminEmail) => {
  const mailOptions = {
    from: `"TasauPVC Security" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_RECEIVER, // The email defined in your .env
    subject: "⚠️ Security Alert: Admin Portal Login",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #d1d5db; border-radius: 10px; background-color: #f9fafb;">
        <h2 style="color: #1e293b;">Admin Login Detected</h2>
        <p>A successful login to the <strong>TasauPVC Control Portal</strong> was detected.</p>
        <p><strong>Account:</strong> ${adminEmail}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280;">If this was not you, please change your admin password immediately.</p>
      </div>
    `,
  };
  return await transporter.sendMail(mailOptions);
};

module.exports = { sendSurveyAlert, sendAdminLoginAlert };