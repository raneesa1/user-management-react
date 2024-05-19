const UserModel = require('../../model/user');
const validateUserData = require('../../util/userValidator');
const HashPassword = require('../../util/hashPassword')


const addUser = async (req, res, next) => {
    try {

        const { name, email, password, phoneNumber , role } = req.body;

        if (!req.body?.email) throw new Error("Please provide email ");
        if (!req.body?.password) throw new Error("Please provide password");

        const validationResult = validateUserData(email, password,name,phoneNumber);
        if (!validationResult.valid) {
            throw new Error(validationResult.message);
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "user already exists with this email",
            });
        }

        const hashedPassword = await HashPassword(password, 10);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            image: "https://res.cloudinary.com/dmrb0zb2v/image/upload/v1715324466/l90ly3carldhsfhx0rpi.jpg",
            role: role,
            phoneNumber
        });
        await newUser.save();

        res.status(200).json({
            status: true,
            message: "user created successfully",
            user: newUser,
        });
    } catch (error) {
        console.error('Error in adding user:', error);
        next(error);
    }
};

module.exports = addUser;
