import express from "express"

import { adminDashboard, sendOTP, verifyOTP } from "../controllers/admin.controler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const adminRouter = express.Router();

// Middlewares for admin authentication can be added here



adminRouter.post("/send-otp", sendOTP);
adminRouter.post("/verify-otp", verifyOTP);
adminRouter.get("/dashboard",authMiddleware, adminDashboard)


export default adminRouter;