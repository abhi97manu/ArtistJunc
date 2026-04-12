const express = require('express')
const cors = require('cors')
const app = express();
const router = require('./Routes/Songs.router');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/user.route');
const tourRouter = require('./Routes/tours.route');
const albumRouter = require('./Routes/album.route')




const allowedOrigins = [process.env.ORIGIN, 'http://localhost:5173'].filter(Boolean);
console.log("Allowed Origins:", allowedOrigins);
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())
app.post('/api',(req, res) => {
  console.log(req.body);
  res.send("ok");
});
app.use('/',router)
app.use('/albums',albumRouter)
app.use('/admin',userRouter)
app.use('/admin/tour',tourRouter)
app.use('/admin/album',albumRouter)



module.exports = app;
