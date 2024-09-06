// const { v2: cloudinary } = require("cloudinary");
// const fs = require("fs");

// // Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadaOnCloudianry = async(localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file has been uploaded successfull
//         //console.log("file is uploaded on cloudinary ", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }

// module.exports = {uploadaOnCloudianry}


const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadaOnCloudianry = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
    } else {
      console.warn(`File not found: ${localFilePath}`);
    }

    return response;
  } catch (error) {
    // If an error occurs, check if the file exists before attempting to delete it
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
    } else {
      console.warn(`File not found during cleanup: ${localFilePath}`);
    }

    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

module.exports = { uploadaOnCloudianry };

