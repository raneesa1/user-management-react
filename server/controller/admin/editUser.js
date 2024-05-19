const UserModel = require('../../model/user');
const { isValidObjectId } = require('../../util/objectIdValidator')


const editUser = async (req, res, next) => {
    try {
        console.log('edit user api')
        const { userId } = req.params;
        const { name, role, phoneNumber } = req.body.data;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid seller ID format" });
        }


        const existingUser = await UserModel.findById(userId);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not found",
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
        if (name) existingUser.email = name;
        if (role) existingUser.role = role;
        if (phoneNumber) existingUser.phoneNumber = phoneNumber


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

module.exports = editUser;
