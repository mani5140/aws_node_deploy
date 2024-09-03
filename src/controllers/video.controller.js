const {mongoose, isValidObjectId} = require("mongoose")
const { ffmpeg } = require('fluent-ffmpeg')
const Video = require('../models/video.model.js')
const User = require('../models/user.model.js')
const { asyncHandler } = require('../utils/asyncHandler.js')
const { ApiError } = require('../utils/ApiError.js')
const { ApiResponse } = require('../utils/ApiResponse.js')
const { uploadaOnCloudianry } = require("../utils/cloudinary.js")


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    // check if title and description is present or not
    // check if thumbnail and video files are uploaded or not 
    // upload the them on cloudinary
    // find the duration of video
    // find the owner
    // create the video 

    if(
        [title, description].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path

    console.log(videoLocalPath, thumbnailLocalPath)
    if(!videoLocalPath || !thumbnailLocalPath){
        throw new ApiError(400, "video or thumbnail are required")
    }
    
    const videoDetails = await uploadaOnCloudianry(videoLocalPath)
    const thumbnailDetails = await uploadaOnCloudianry(thumbnailLocalPath)

    console.log(videoDetails)

    if(!videoDetails || !thumbnailDetails){
        throw new ApiError(500, "failed to upload the files")
    }

    const video = await Video.create({
        videoFile: videoDetails.url,
        thumbnail: thumbnailDetails.url,
        title: title.toLowerCase(),
        description: videoDetails.duration,
        duration: 20,
        owner: req.user._id
    })

    if(!video){
        throw new ApiError(500, "Something went wrong while uploading video")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Video Uploaded Successfully !!")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    console.log(videoId)
    //TODO: update video details like title, description, thumbnail
    const {title, description} = req.body

    const thumbnailLocalPath = req.file?.path
    const thumbnailDetails = await uploadaOnCloudianry(thumbnailLocalPath)

    if(!thumbnailDetails){
        throw new ApiError(500, "Unable to upload")
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: thumbnailDetails.url
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Details updated Successfully!!")
    )

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

module.exports = {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}