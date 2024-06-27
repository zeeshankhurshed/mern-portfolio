import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/userSchema.js';
import { v2 as cloudinary } from 'cloudinary';
import { generateToken } from '../utiles/jwtToken.js';
import { sendEmail } from '../utiles/sendEmail.js';
import crypto from 'crypto';

export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Avatar and Resume are required!", 400));
    }
    const { avatar} = req.files;
    // console.log("AVATAR",avatar);
    const cloudinaryResponseforAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        { folder: "Avatar" }
    );
    if (!cloudinaryResponseforAvatar || cloudinaryResponseforAvatar.error) {
        return next(new ErrorHandler("Cloudinary Error: Avatar upload failed", 500));
    }
    const { resume } = req.files;
    // console.log("RESUME",resume);
    const cloudinaryResponseforResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "Resume" }
    );
    if (!cloudinaryResponseforResume || cloudinaryResponseforResume.error) {
        return next(new ErrorHandler("Cloudinary Error: Resume upload failed", 500));
    }
    const {
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        facebookURL,
        twitterURL,
        linkedInURL,
    } = req.body;
    const user = await User.create({
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        facebookURL,
        twitterURL,
        linkedInURL,
        avatar: {
            public_id: cloudinaryResponseforAvatar.public_id,
            url: cloudinaryResponseforAvatar.secure_url,
        },
        resume: {
            public_id: cloudinaryResponseforResume.public_id,
            url: cloudinaryResponseforResume.secure_url,
        }
    });
   generateToken(user, "User Registered",201,res)
});

export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email and Password are required"))
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password"));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password"));
    }
    generateToken(user,"Logged In", 200, res);
})


export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite:"None",
        secure:true
    }).json({
        success: true,
        message: "Logged Out"
    });
});


export const getUser=catchAsyncErrors(async(req, res, next)=>{
    const user =await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
})

export const updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserdata={
        fullName:req.body.fullName,
        email:req.body.email,
        phone:req.body.phone,
        aboutMe:req.body.aboutMe,
        portfolioURL:req.body.portfolioURL,
        githubURL:req.body.githubURL,
        instagramURL:req.body.instagramURL,
        twitterURL:req.body.twitterURL,
        linkedInURL:req.body.linkedInURL,
        facebookURL:req.body.facebookURL,
    }
    if(req.files && req.files.avatar){
        const avatar=req.files.avatar;
        const user=await User.findById(req.user.id);
        const profileImageId=user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        const cloudinaryResponseforAvatar = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            { folder: "Avatar" }
        );
        newUserdata.avatar={
            public_id:cloudinaryResponseforAvatar.public_id,
            url:cloudinaryResponseforAvatar.secure_url,
        }
    }
    if(req.files && req.files.resume){
        const resume=req.files.resume;
        const user=await User.findById(req.user.id);
        const profileImageId=user.resume.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        const cloudinaryResponseforResume = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Resume" }
        );
        newUserdata.resume={
            public_id:cloudinaryResponseforResume.public_id,
            url:cloudinaryResponseforResume.secure_url,
        }
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserdata,{
        runValidators:true,
        usefindAndModify:false,
    });
    res.status(200).json({
        success:true,
        message:"Profile Updated",
        user,
    })
})

export const updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const {currentPassword, newPassword, confirmPassword}=req.body;
    if(!confirmPassword || !newPassword || !confirmPassword){
        return next(new ErrorHandler("Please fill all fields.",400))
    }
    const user =await User.findById(req.user.id).select('+password');
    const isPasswordMatched=await user.comparePassword(currentPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect current password", 400));

    }
    if(newPassword !== confirmPassword){
        return next (new ErrorHandler("New password and confirm password dont match.",400));

    }
    user.password=newPassword;
    await user.save();
    res.status(200).json({
        success:true,
        message:"Password Updated"
    })
})

export const getUserPortfolio=catchAsyncErrors(async(req,res,next)=>{
const id="6659638f7e188fa4441b4aa9";
const user=await User.findById(id);
res.status(200).json({
    success:true,
    user,
})
})

export const fortgotPassword=catchAsyncErrors(async(req,res,next)=>{
 const user=await User.findOne({email:req.body.email});
 if(!user){
    return next(new ErrorHandler("User not fount!",404));
 }
 const resetToken=user.getResetPasswordToken();
 await user.save({validateBeforeSave:false});
 const resetPasswordUrl=`${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
 const message=`Your reset password token is:-\n\n ${resetPasswordUrl}\n\n if you've not request for this please ignor it.`

try {
    await sendEmail({
        email:user.email,
        subject:"Personal portfolio dashboard recovery password",
        message,
    })
    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`
    })
} catch (error) {
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;
    await user.save();
    return next(new ErrorHandler(error.message,500));
    
}

})

export const resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const { token } = req.params;
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
   const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has expired", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password & confirm password do not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    generateToken(user, "Reset Password successfully", 200, res);
})