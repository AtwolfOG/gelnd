import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplate";

const sender = process.env.SENDER_EMAIL;
const password = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 465,
  secure: false,
  auth: {
    user: sender,
    pass: password,
  },
});

async function sendverification(token: string, email: string): Promise<void> {
  try {
    await transporter.sendMail({
      from: "Gelnd@gmail.com",
      to: email,
      subject: "Verification Code",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
    });
  } catch (err) {
    throw err;
  }
}

export { sendverification };
