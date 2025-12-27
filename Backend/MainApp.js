const express = require('express')
const cors = require('cors')
const app = express();
const router = require('./Routes/Songs.router');
const cookieParser = require('cookie-parser');





app.use(express.json())
app.use('/',router)
app.use(cookieParser())



module.exports = app;