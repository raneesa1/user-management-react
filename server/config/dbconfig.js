const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URI;


const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
        console.log('mongodb connected');
    } catch (error) {
        console.error('fail to connect mongodb:', error);
    }
};

module.exports = connectDB;