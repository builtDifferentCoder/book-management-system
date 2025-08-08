import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js";
import logger from "../logger/logger.js";

const signUp=asyncHandler(async (req, res) => {
    const {username,email,password}=req.body;
    const role=req.body.role;
    if(!username ||!email||!password){
        throw new Error("Please fill all required fields");
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(401).json({error:"User already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
        ...(role&&{role:role})
    })
    try{
        await newUser.save();
        generateToken(res,newUser._id)
        logger.info(`User created successfully`)
        res.status(201).json({
            success:true,
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role,
        });
    }catch(err){
        logger.error(err);
        res.status(500).json({
            error:"Error signing up",
        })
    }
})

const signIn=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const existingUser=await User.findOne({email});
    if(!existingUser){
        return res.status(401).json({error:"User does not exist"});
    }
    const isValidPassword=await bcrypt.compare(password,existingUser.password)

    if(isValidPassword){
        generateToken(res,existingUser._id)
        logger.info(`User signed in successfully`)
        res.status(201).json({
            success:true,
            id:existingUser._id,
            username:existingUser.username,
            email:existingUser.email,
            role:existingUser.role
        })
    }else{
        res.status(500).json({
            error:"Error signing In"
        })
    }
})

const signOut=asyncHandler(async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({
        message:"Signed Out",
    })
})

const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({})
    if(!users){
        return res.status(401).json({error:"No users registered at the" +
                " moment."});
    }
    res.status(200).json({users:users})
})

const getCurrentUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)

    if(user){
        return res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email
        })
    }else{
        return res.status(404).json({error:"User does not exist"});
    }
})
const updateCurrentUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)

    if(user){
        user.username=req.body.username||user.username;
        user.email=req.body.email||user.email

        if(req.body.password){
            const hashedPassword=await bcrypt.hash(req.body.password,10);
            user.password=hashedPassword
        }
        const updatedUser=await user.save()
        res.status(200).json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
        })
    }else{
        res.status(404).json({error:"User does not exist"});
    }
})
export {signUp,signIn,signOut,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile};