import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, otp) => {
  try {
    // 🔍 Check API Key before sending
    console.log("🔑 Resend API Key loaded:", !!process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "Admin Panel <onboarding@resend.dev>", // domain can be updated later
      to,
      subject: "Your Admin Panel OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2><p>This code expires in 10 minutes.</p>`,
    });

    console.log("✅ Email sent successfully to:", to);
    console.log("📤 Resend API Response:", response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
  }
};

export default sendEmail;







// import nodemailer from 'nodemailer';

// const sendEmail = async (to, otp) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS,
//             },
//             tls: {
//     rejectUnauthorized: false, // 👈 important line
//   },
//         });

//         await transporter.sendMail({
//             from: `"Admin Panel" <${process.env.SMTP_USER}>`,
//             to,
//             subject: 'Your Admin Panel OTP Code',
//             html: `<h2>Your OTP is: ${otp}</h2> <p>It will expire in 5 minutes.</p>`
//         })
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }

// }

// export default sendEmail;


