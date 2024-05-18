const UserModel = require('../../model/user');

const getAllUser = async (req, res, next) => {
    try {
        console.log('user details fetched')
        const users = await UserModel.find({ role: "user", deleted: false });
        res.status(200).json({
            status: true,
            message: "Successful",
            users,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAllUser;
