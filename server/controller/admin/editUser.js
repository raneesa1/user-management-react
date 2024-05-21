const UserModel = require('../../model/user');
const { isValidObjectId } = require('../../util/objectIdValidator')

const getUserInfo = async (req, res, next) => {
    try {
        const { userId } = req.params
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(400).json({ status: false, message: 'no user found' })
        }
        res.status(200).json({ status: true, message: 'success', user: user })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


const editUser = async (req, res, next) => {
    try {
        console.log('edit user api')
        const { userId } = req.params;
        const { name, role, phoneNumber } = req.body.data;
        console.log(req.body.data, 'consling the req body data form the edit user post funciton')

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
                return res.status(400).json({ valid: false, message: "Invalid phone number format" });
            }

            if (phoneNumber) existingUser.phoneNumber = phoneNumber
        }
        if (name) {
            if (name.trim().length == 0) {
                return res.status(400).json({ valid: false, message: "Name is required" });
            }
        }
        if (name) existingUser.name = name;
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

module.exports = { editUser, getUserInfo };
