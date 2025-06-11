import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {ApiResponse} from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';

const generateAccessTokenandRefereshToken= async (userId)=>{
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken= refreshToken
        await user.save({validateBeforeSave : false})
        return {accessToken,refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "access and refresh Token generation failed")
    }
}

const registerUser = asyncHandler(async (req, res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
 // get user details from frontend
    const {email, password, username, role} = req.body
    console.log("email", email);
    console.log(req.body)
     

    // validation - not empty
    
    if ([email, password, username, role].some(field => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
    }

    if (!["student", "teacher"].includes(role)) {
    throw new ApiError(400, "Role must be either student or teacher");
    }

    // check if user already exists: username, email
    const existedUser = await User.findOne({
        $or : [{email}, {username}]
    })

    if (existedUser){
        throw new ApiError(409, "User already exists")
    }

    const user =  await User.create({
        email,
        password,
        username: username,
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "User creation failed")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )

})

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    console.log(req.body);
    
    if(!email){
        throw new ApiError(400, "Please provide email")
    }

    const user= await User.findOne({email})
    if(!user){
        throw new ApiError(403, "User does not exists")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    console.log(isPasswordCorrect);
    
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessTokenandRefereshToken(user._id)
    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options ={
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, 
            {
                user : loggedInUser,
                accessToken,
                refreshToken
            },
             "User logged in successfully")

    )

})


const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            refreshToken : undefined
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, "User logged out succesfully")
    )
})


export const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshTokenFromCookie = req.cookies.refreshToken;

    if (!refreshTokenFromCookie) {
        throw new ApiError(401, "Refresh token missing");
    }

    const decodedToken = jwt.verify(refreshTokenFromCookie, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id);

    if (!user || user.refreshToken !== refreshTokenFromCookie) {
        throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json(
        new ApiResponse(200, {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }, "Access token refreshed")
    );
});
export {registerUser,
        loginUser, 
        logoutUser
} 