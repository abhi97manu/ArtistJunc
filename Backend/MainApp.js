const express = require('express')
const cors = require('cors')
const app = express();
const router = require('./Routes/Songs.router');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/user.route');
const tourRouter = require('./Routes/tours.route');
const albumRouter = require('./Routes/album.route')




app.use(cors({
  origin: 'https://creatr-abhi97manu-abhisheks-projects-64c62193.vercel.app',
  credentials: true,
}));
app.use(express.json())
app.post('/api',(req, res) => {
  console.log(req.body);
  res.send("ok");
});
app.use('/',router)
app.use('/albums',albumRouter)
app.use('/admin',userRouter)
app.use('/admin/tour',tourRouter)
app.use('/admin/album',albumRouter)
app.use(cookieParser())



module.exports = app;