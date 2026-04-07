import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: parseInt(process.env.SMTP_PORT || "587") === 465,
  auth: {
    user: process.env.SMTP_USER || "umang@weetechsolution.com",
    pass: process.env.SMTP_PASS || "wtpe fyto klam rokg",
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
