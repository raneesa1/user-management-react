const mongoose = require('mongoose')
require('../config/dbconfig')
require('dotenv').config()



const UserSchema = new mongoose.Schema({
    email: {
        type: String,

    },
    name:{
        type:String
    },
    password: {
        type: String,

    },
    phoneNumber:{
        type:Number
    },
    date: {
        type: Date,
    },
    role: {
        type: String,
        default: 'seller'
    },
    deleted: {
        type: Boolean,
        default: false,
    },
})
const UserModel = mongoose.model(process.env.USER_COLLECTION, UserSchema)
module.exports = UserModel