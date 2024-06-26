import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from 'cloudinary';
import { Project } from "../models/projectSchema.js";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Project banner image required", 400));
    }

    const { projectBanner } = req.files;

    // Trim spaces from keys and values
    const body = {};
    for (let key in req.body) {
        body[key.trim()] = req.body[key].trim();
    }

    const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = body;

    // Checking all required fields
    if (!title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed) {
        return next(new ErrorHandler("Please provide all details", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        { folder: "PROJECT_PORTFOLIO_IMAGE" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:", 
            cloudinaryResponse.error || "Unknown cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload projectBanner to cloudinary", 500));
    }

    const project = await Project.create({
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    res.status(201).json({
        success: true,
        message: "New project created",
        project,
    });
});
export const updateProject = catchAsyncErrors(async (req, res, next) => {
    const newProjectData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        projectLink: req.body.projectLink,
        technologies: req.body.technologies,
        stack: req.body.stack,
        deployed: req.body.deployed,
    };

    if (req.files && req.files.projectBanner) {
        const projectBanner = req.files.projectBanner;
        const project = await Project.findById(req.params.id);
        if (!project) {
            return next(new ErrorHandler('Project not found', 404));
        }

        const projectBannerId = project.projectBanner.public_id;
        await cloudinary.uploader.destroy(projectBannerId);

        const cloudinaryResponse = await cloudinary.uploader.upload(
            projectBanner.tempFilePath,
            { folder: "PROJECT_PORTFOLIO_IMAGE" }
        );

        newProjectData.projectBanner = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    res.status(200).json({
        success: true,
        message: "Project Updated",
        project,
    });
});
export const deleteProject=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const project=await Project.findById(id);
    if(!project){
        return next (new ErrorHandler("Project not found", 404));
    }
    await project.deleteOne();
    res.status(200).json({
        success:true,
        message:"Project Deleted",
    })
})
export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find();
    res.status(200).json({
        success: true,
        projects,
    });
});

export const getSigleProject=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const project=await Project.findById(id);
    if(!project){
        return next (new ErrorHandler("Project not found", 404));
    }
    res.status(200).json({
        success:true,
        project,
    })
})