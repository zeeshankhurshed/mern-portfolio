import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { softwareApplication} from "../models/softwareApplicationSchema.js";
import { v2 as cloudinary} from 'cloudinary'; // Make sure you import cloudinary

export const addNewApplication = catchAsyncErrors(async(req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Software Application Icon/Svg required!", 400));
    }
     const { svg } = req.files;
    const { name } = req.body;
    if (!name) {
        return next(new ErrorHandler("Software's name is required", 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath, // Corrected from avatar.tempFilePath
        { folder: "PORTFOLIO_SOFTWARE_APPLICATIONS" } // Modified folder name
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary Error"
        );
        return next(new ErrorHandler("Failed to upload SVG file to Cloudinary", 500));
    }
    try {
        const newSoftwareApplication = await softwareApplication.create({
            name,
            svg: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        });
        res.status(200).json({
            success: true,
            message: "New Software Application added successfully"
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const application = await softwareApplication.findById(id);
    if (!application) {
        return next(new ErrorHandler('Software application not found', 404));
    }
    const softwareApplicationSvgId = application.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationSvgId);
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Software Application deleted",
    });
});

export const getAllApplication=catchAsyncErrors(async(req,res,next)=>{
    const application=await softwareApplication.find();
    res.status(200).json({
        success:true,
        application,
    })
})