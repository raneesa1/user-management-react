// jwtSellerAuthentication.js
const jwt = require("jsonwebtoken");

const authenticateSellerJwt = (req, res, next) => {
    try {
        const token = req.cookies.UserJwtToken;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
            }

            const { role } = decoded.payload;
            if (role !== 'seller') {

                return res.status(403).json({ success: false, message: 'Unauthorized access' });
            }

            req.user = decoded.payload;
            next();
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = authenticateSellerJwt;
