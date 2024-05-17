
const express = require('express');
const userRouter = express.Router();
const editProfile = require('../controller/user/editProfile')
const authenticateUser = require('../middleware/jwtUserAuthentication')


userRouter.patch('/editProfile', authenticateUser, editProfile)


module.exports = userRouter;


