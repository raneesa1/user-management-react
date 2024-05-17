const UserModel = require('../../model/user');
const { isValidObjectId } = require('../../util/objectIdValidator')

const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(400).json({ status: false, message: "user not found" });
        }

        user.deleted = true;
        await user.save();

        res.status(200).json({ status: true, message: "user deleted successfully" });
    } catch (error) {
        next(error)

    }
}

module.exports = deleteUser;