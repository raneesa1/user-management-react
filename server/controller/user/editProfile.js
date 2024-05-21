const UserModel = require('../../model/user');
const { isValidObjectId } = require('../../util/objectIdValidator')
const cloudinary = require('../../config/cloudinaryConfig');

const editProfile = async (req, res, next) => {
    try {
        console.log('edit profile api called')
        const { name, phoneNumber, image } = req.body.data;
        const { userId } = req.params;

        console.log(image,'consoling the image from the req')

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }

        const existingUser = await UserModel.findById(userId);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        if (phoneNumber) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phoneNumber)) {
                return { valid: false, message: "Invalid phone number format" };
            }

            if (phoneNumber) existingUser.phoneNumber = phoneNumber
        }
        if (name) {
            if (name.trim().length == 0) {
                return { valid: false, message: "Name is required" };
            }
        }
        if (name) existingUser.name = name;
        if (image) {
            console.log('inside the if condition of image from edit profile in the backend')
            const uploadedImage = await cloudinary.uploader.upload(image, {
                folder: 'user_images',
                transformation: [{ width: 500, height: 500, crop: 'limit' }],
            });

            console.log(existingUser.image,'old image')
            console.log(uploadedImage.secure_url,'url after editing the image')
            existingUser.image = uploadedImage.secure_url;
        }

        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: existingUser,
        });
    } catch (error) {
        console.error('Error in editing user:', error);
        next(error);
    }
};

module.exports = editProfile;
