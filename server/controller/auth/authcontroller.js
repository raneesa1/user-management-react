
const bcrypt = require('bcrypt');
const UserModel = require('../../model/user');
const validateUserData = require('../../util/userValidator');
const HashPassword = require('../../util/hashPassword')
const generateJwt = require('../../service/jwt');



const signup = async (req, res, next) => {
    try {

        const { email, password, role, phoneNumber, name } = req.body;
        const userRole = role || 'user';
        console.log(email, password)

        if (!req.body?.email) throw new Error("Please provide email");
        if (!req.body?.password) throw new Error("Please provide password");

        const validationResult = validateUserData(email, password, name, phoneNumber);
        if (!validationResult.valid) {
            throw new Error(validationResult.message);
        }
        const emailExist = await UserModel.findOne({ email });
        if (emailExist) {
            throw new Error("User already exists with this email");
        }

        const hashedPassword = await HashPassword(password, 10);


        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            image: "https://res.cloudinary.com/dmrb0zb2v/image/upload/v1715324466/l90ly3carldhsfhx0rpi.jpg",
            role: userRole,
            phoneNumber
        });

        console.log(newUser)


        await newUser.save();

        const accessToken = generateJwt({ userId: newUser._id, role: userRole });


        const cookieName = userRole === 'admin' ? 'AdminJwtToken' : 'UserJwtToken';

        res.cookie(cookieName, accessToken, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ status: true, message: "User created successfully", user: newUser, role, token: accessToken, });
    } catch (error) {
        next(error)

    }
}


const login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        console.log(email, password)
        if (!req.body?.email) throw new Error('please provide your email')
        if (!req.body?.password) throw new Error('please provide your password')

        const userRole = role || 'user';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email")
        }

        const userExist = await UserModel.findOne({ email });
        if (!userExist) {
            throw new Error("User not registered");
        }

        const passCompare = await bcrypt.compare(password, userExist.password);
        if (!passCompare) {
            throw new Error("Incorrect email or password");
        }

        const accessToken = generateJwt({
            userId: userExist._id,
            role: userExist.role,
        });
        const cookieName = userRole === 'admin' ? 'AdminJwtToken' : 'UserJwtToken';
        res.cookie(cookieName, accessToken, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            status: true,
            message: "Successfully logged in",
            user: userExist,
            role: userExist.role,
            token: accessToken,
        });
    } catch (error) {
        next(error);
    }
};

const adminLogout = async (req, res, next) => {
    try {

        const cookieName = req.cookies.AdminJwtToken
        res.clearCookie(cookieName);
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        next(error)
    }
};


const userLogout = async (req, res, next) => {
    try {

        const cookieName = req.cookies.UserJwtToken
        res.clearCookie(cookieName);
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        next(error)
    }
};




module.exports = { signup, login, adminLogout, userLogout };
