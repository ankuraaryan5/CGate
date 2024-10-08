import ErrorHandler from "../error/error.js";
import { Signup } from "../models/signupModel.js";
import jwt from 'jsonwebtoken'
const send_login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields", 400));
    }
    try {
        const user = await Signup.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found", 401));
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new ErrorHandler("Wrong Password", 401));
        }
        if (user.uType !== 'user' && user.uType !== 'admin') {
            return next(new ErrorHandler("Unauthorized user type", 403));
        }
        const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "error in login", 
        });
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
}

export default send_login;