import Genre from "../models/genre.js"
import asyncHandler from "../middleware/asyncHandler.js";

const createGenre=asyncHandler(async (req, res) => {
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({
                message: "Please enter name",
            })
        }
        const genre=await Genre.findOne({name});
        if(genre){
            return res.status(400).json({
                message:"Genre already exists",
            })
        }
        const newGenre=new Genre({name})
        await newGenre.save()
        res.status(201).json({
            message:"Genre added successfully",
        })

    }catch(err){
        res.status(500).json({
            message: "Error creating genre",
        })
    }
})

const updateGenre=asyncHandler(async (req, res) => {
    try{
        const {id}=req.params;
        const genre=await Genre.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            message:"Genre updated successfully",
        })
    }catch(err){
        res.status(500).json({
            message:"Error updating genre",
        })
    }
})

const removeGenre=asyncHandler(async (req, res) => {
    try{
        const {id}=req.params;
        const genre=await Genre.findByIdAndDelete(id)
        res.status(200).json({
            message:"Genre deleted successfully",
            genre
        })
    }
    catch(err){
        res.status(500).json({
            message:'Error deleting genre',
        })
    }
})

const listGenre=asyncHandler(async (req, res) => {
    try{
        const genre=await Genre.find()
        res.status(200).json({
            data:genre,
        })
    }catch(err){
        res.status(500).json({
            message: "Error listing genre",
        })
    }
})

const readGenre=asyncHandler(async (req, res) => {
    try{
        const {id}=req.params;
        const genre=await Genre.findById(id)
        if(!genre){
            return res.status(404).json({
                message:"No such genre",
            })
        }
        res.status(200).json(genre)
    }catch(err){
        res.status(500).json({
            message:"Error getting genre",
        })
    }
})

export {
    createGenre,
    updateGenre,
    removeGenre,
    listGenre,
    readGenre,
}