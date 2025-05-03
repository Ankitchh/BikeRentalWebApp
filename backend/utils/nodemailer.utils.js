import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const sendEmail = async (email, name, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use TLS, but not on connect (STARTTLS)
      auth: {
        user: process.env.NODE_MAILER_SENDER_EMAIL,
        pass: process.env.NODE_MAILER_SENDER_PASSWORD, // your app password
      },
    });

    const info = await transporter.sendMail({
      from: `"Bike Rental" <${process.env.NODE_MAILER_SENDER_EMAIL}>`,
      to: email,
      subject: "One time Code for login",
      text: `Hello ${name}, this is your one-time code: ${otp}. Do not share this with anyone.`,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
