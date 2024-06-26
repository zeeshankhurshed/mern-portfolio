import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary} from 'cloudinary'; // Make sure you import cloudinary
import { Skill } from "../models/skillSchema.js";
export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Skill svg required", 400));
    }
    const { svg } = req.files;
    const { title, proficiency } = req.body;

    // Corrected condition to check if both title and proficiency are present
    if (!title || !proficiency) {
        return next(new ErrorHandler('Please fill full form', 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath,  // Ensure the correct property is used
        { folder: "PORTFOLIO_SKILLS_SVGS" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            'Cloudinary Error:',
            cloudinaryResponse.error || 'Unknown Cloudinary Error'
        );
        return next(new ErrorHandler('Cloudinary upload failed', 500));
    }
    const skill = await Skill.create({
        title,
        proficiency,
        svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    res.status(200).json({
        success: true,
        message: "New skill added",
        skill,
    });
});
export const deleteSkill=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const skill=await Skill.findById(id);
    if(!skill){
        return next (new ErrorHandler('Skill not found', 404));
    }
    const skillSvgId=skill.svg.public_id;
    await cloudinary.uploader.destroy(skillSvgId);
    await skill.deleteOne();
    res.status(200).json({
        success:true,
        message:"Skill Deleted"
    })
});
export const updateSkill = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const skill = await Skill.findById(id);
    if (!skill) {
        return next(new ErrorHandler('Skill not found', 404));
    }
    const { proficiency } = req.body;
    const updatedSkill = await Skill.findOneAndUpdate(
        { _id: id }, 
        { proficiency },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
    res.status(200).json({
        success: true,
        message: "Skill updated",
        skill: updatedSkill,
    });
});
export const getAllSkills=catchAsyncErrors(async(req,res,next)=>{
    const skills=await Skill.find();
    res.status(200).json({
        success:true,
        skills,
    })
});