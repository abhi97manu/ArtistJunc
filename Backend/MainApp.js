const express = require('express')
const cors = require('cors')
const app = express();
const router = require('./Routes/Songs.router');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/user.route');
const tourRouter = require('./Routes/tours.route');





app.use(express.json())
app.use('/',router)
app.use('/admin',userRouter)
app.use('/admin/tour',tourRouter)
app.use(cookieParser())



module.exports = app;