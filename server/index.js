import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbconnection from './database/dbConnect.js';
import cloudinary from 'cloudinary';
import { errorMiddleWare } from './middlewares/error.js';
import messageRouter from './router/messageRoute.js';
import userRouter from  './router/userRouter.js'  // Correct path
import timelineRouter from  './router/timelineRouter.js'  // Correct path
import applicationRouter from  './router/softwareApplicationRouter.js'  // Correct path
import skillRouter from  './router/skillRoutes.js'  // Correct path
import projectRouter from  './router/projectRoutes.js'  // Correct path
dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Alternate of multer
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use('/api/vi/message', messageRouter);
app.use('/api/vi/user', userRouter);  // Correct path
app.use('/api/vi/timeline', timelineRouter);  // Correct path
app.use('/api/vi/softwareApplication', applicationRouter);  // Correct path
app.use('/api/vi/skill', skillRouter);  // Correct path
app.use('/api/vi/project', projectRouter);  // Correct path
dbconnection();
app.use(errorMiddleWare);
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
// Token generation function
export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    // Parse COOKIE_EXPIRES as a number
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRES, 10);
    // Log the environment variable and parsed value
    // console.log("COOKIE_EXPIRES (raw):", process.env.COOKIE_EXPIRES);
    // console.log("COOKIE_EXPIRES (parsed):", cookieExpireDays);
    // Check if the parsing was successful
    if (isNaN(cookieExpireDays)) {
        // console.error("COOKIE_EXPIRES environment variable is not a valid number");
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
    // Calculate the expiration date
    const expires = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);
    // Log the expiration date for debugging
    // console.log("Token expires at:", expires);
    res.status(statusCode).cookie("token", token, {
        expires, // Correctly set the expiration date
        httpOnly: true
    }).json({
        success: true,
        message,
        token,
        user,
    });
}
//2:15:25