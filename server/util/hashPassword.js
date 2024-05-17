const bcrypt = require('bcrypt');

const HashPassword = async (password, saltround) => {
    return await bcrypt.hash(password, saltround);
};

module.exports = HashPassword;
