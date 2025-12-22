const express = require('express')
const cors = require('cors')
const app = express();
const router = require('./Routes/Songs.router')




app.use(cors());
app.use(express.json())
app.use('/',router)




module.exports = app;