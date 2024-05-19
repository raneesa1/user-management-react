const UserModel = require('../../model/user');
const { isValidObjectId } = require('../../util/objectIdValidator')


const editProfile = async (req, res, next) => {
    try {
        console.log('edit profile api called')
        const { name, phoneNumber } = req.body.data;
        const { userId } = req.params;
        console.log(userId, name, phoneNumber, 'consoling then user if and anothe infro from edit profile')

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
        if(name){
            if(name.trim().length == 0){
                return { valid: false, message: "Name is required" };
            }
        }
        if (name) existingUser.name = name;


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
