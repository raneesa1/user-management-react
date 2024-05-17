

const cloudinary = require('../config/cloudinaryConfig')

const uploadImagesToCloudinary = async (images) => {
    try {
        const uploadedImages = await Promise.all(images.map(async (img) => {
            const uploadedImage = await cloudinary.uploader.upload(img);
            return uploadedImage.secure_url;
        }));
        return uploadedImages;
    } catch (error) {
        console.error('Error uploading images to Cloudinary:', error);
        throw error;
    }
};

module.exports = uploadImagesToCloudinary;
