const express = require('express');
const connectDB = require('./config/dbconfig');
require('dotenv').config();

const userRouter = require('./router/user')
const adminRouter = require('./router/admin')
const authRouter = require('./router/authentication')

const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(require('cors')({
    origin: 'http://localhost:3200',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use('/api/admin', adminRouter);
app.use('/api/', authRouter);
app.use('/api/users', userRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

connectDB()

const server = app.listen(PORT, () => {
    console.log('Server running on port', PORT);

});
module.exports = server