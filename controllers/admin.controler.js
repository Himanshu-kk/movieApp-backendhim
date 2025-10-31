export const sendOTP = async (req, res) => {
  try {
    await dbConnect(); // ← **ये लाइन जोड़ें!**

    const { email } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Permission denied: Not allowed email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    let admin = await Admin.findOne({ email });

    if (!admin) {
      admin = new Admin({ email, otp, otpExpiry });
      await admin.save();
    } else {
      admin.otp = otp;
      admin.otpExpiry = otpExpiry;
      await admin.save();
    }

    await sendEmail(email, otp);

    res.status(200).json({ message: "OTP sent to admin email successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};