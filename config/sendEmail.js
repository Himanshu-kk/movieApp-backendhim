import nodemailer from 'nodemailer';

const sendEmail = async (to, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
    rejectUnauthorized: false, // 👈 important line
  },
        });

        await transporter.sendMail({
            from: `"Admin Panel" <${process.env.SMTP_USER}>`,
            to,
            subject: 'Your Admin Panel OTP Code',
            html: `<h2>Your OTP is: ${otp}</h2> <p>It will expire in 5 minutes.</p>`
        })
    } catch (error) {
        console.error("Error sending email:", error);
    }

}

export default sendEmail;