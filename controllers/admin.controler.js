import jwt from "jsonwebtoken";
import sendEmail from "../config/sendEmail.js";
import Admin from "../models/admin.model.js";



// generate random 6 digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// send Otp to admin email
export const sendOTP = async (req,res) => {
    try {
        const {email} = req.body;
        if(email !== process.env.ADMIN_EMAIL)
            return res.status(403).json({ message: "Permission denied Not allowed email" });


        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mintutes from now

        let admin = await Admin.findOne({ email });
        if (!admin) {
            admin = new Admin({ email, otp, otpExpiry });
            await admin.save();
        }else {
            admin.otp = otp;
            admin.otpExpiry = otpExpiry;
            await admin.save();
        }

        await sendEmail(email, otp)

        res.status(200).json({ message: "OTP sent to admin email successfully"})
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP", error: error.message})
    }     
}; 

// verify OTP

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(400).json({ message: "Admin not found"})
        }
        if (admin.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP"})
        }

        const token = jwt.sign({ email: admin.email}, process.env.JWT_SECRET, { expiresIn: "7d"},);

        admin.otp = null;
        await admin.save();
        

        res.status(200).json({ message: "Login Successful", token})
    } catch (error) {
        res.status(500).json({ message: "Failed to verify OTP", error: error.message})
    }
};

export const adminDashboard = async (req, res) => {
    res.status(200).json({ message: "Welcome to the admin dashboard", user: req.user})
} 