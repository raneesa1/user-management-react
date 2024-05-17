const jwt = require('jsonwebtoken');

const generateJwt = (payload) => {
    return jwt.sign({
        payload
    }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = generateJwt 