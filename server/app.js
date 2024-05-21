const express = require('express');
const connectDB = require('./config/dbconfig');
require('dotenv').config();

const bodyParser = require('body-parser');
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

app.use(cookieParser());


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use('/api/admin', adminRouter);
app.use('/api/', authRouter);
app.use('/api/user', userRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

connectDB()

const server = app.listen(PORT, () => {
    console.log('Server running on port', PORT);

});
module.exports = server