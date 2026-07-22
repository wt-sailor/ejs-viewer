import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.resend.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: parseInt(process.env.SMTP_PORT || "465") === 465,
  auth: {
    user: process.env.SMTP_USER || "resend",
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(
  html: string,
  recipientEmail: string,
  senderEmail: string
) {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL_FROM || senderEmail,
      to: recipientEmail,
      subject: "Email from EJS Template",
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}
