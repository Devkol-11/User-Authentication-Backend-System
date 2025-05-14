import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail({ to, code }) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`,
    });
  } catch (error) {
    console.error("Email failed to send:", error);
    throw new Error("Failed to send verification email");
  }
}

export default sendVerificationEmail;
