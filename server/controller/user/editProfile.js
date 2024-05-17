const UserModel = require('../../model/user');
const { isValidObjectId } = require('../../util/objectIdValidator')


const editSeller = async (req, res, next) => {
    try {
        console.log('edit profile api called')

        // const { email, role } = req.body.data;

        // if (!isValidObjectId(sellerId)) {
        //     return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        // }


        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ success: false, message: "Invalid email" });
        // }


        // const existingUser = await UserModel.findById(sellerId);
        // if (!existingUser) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Seller not found",
        //     });
        // }
        // if (email) existingUser.email = email;
        // if (role !== undefined) {
        //     if (role) existingUser.role = role;
        // }
        // await existingUser.save();

        // res.status(200).json({
        //     success: true,
        //     message: "Seller updated successfully",
        //     user: existingUser,
        // });
    } catch (error) {
        console.error('Error in editing user:', error);
        next(error);
    }
};

module.exports = editSeller;
