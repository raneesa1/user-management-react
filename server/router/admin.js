const express = require('express');
const addUser = require('../controller/admin/addUser')
const updateUser = require('../controller/admin/editUser')
const deleteUser = require('../controller/admin/deleteUser')
const getAllUser = require('../controller/admin/getAllUsers')


const authenticateJwtAdmin = require('../middleware/jwtAdminAuthentication');

const adminRouter = express.Router();

    
adminRouter.get('/users', authenticateJwtAdmin, getAllUser)
adminRouter.post('/addUser', authenticateJwtAdmin, addUser)
adminRouter.delete('/deleteUser/:userId', authenticateJwtAdmin, deleteUser)
adminRouter.patch('/updateUser/:userId', authenticateJwtAdmin, updateUser.editUser)
adminRouter.get('/editUser/:userId', authenticateJwtAdmin, updateUser.getUserInfo)


module.exports = adminRouter;