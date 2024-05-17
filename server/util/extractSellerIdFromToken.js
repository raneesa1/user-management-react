const jwt = require('jsonwebtoken');

const extractSellerIdFromToken = (req) => {
    try {
        const token = req.cookies['UserJwtToken'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const sellerId = decoded.payload.userId;
        return sellerId;
    } catch (error) {
        console.error('Error extracting seller ID from token:', error);
        return null; 
    }
};

module.exports = extractSellerIdFromToken;
