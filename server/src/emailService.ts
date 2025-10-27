import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.MAILTRAP_PORT || "2525"),
  auth: {
    user: process.env.MAILTRAP_USER || "1b9392ab357236",
    pass: process.env.MAILTRAP_PASS || "a6ae36673d49cb",
  },
});

export async function sendEmail(
  html: string,
  recipientEmail: string,
  senderEmail: string
) {
  try {
    const mailOptions = {
      from: senderEmail,
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
