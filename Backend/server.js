require('dotenv').config();
const http = require('http');
const express = require('express')
const passport = require('passport');
require('./auth')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const server = http.createServer(app)
const validateData = require('./middlewares/validation.js')
const authenicateJwt = require('./middlewares/authentication.js')
const port = process.env.PORT || 8000;
const { Server } = require("socket.io")
const path = require("path")
const ejs=require('ejs');

// web-socket
const io = new Server(server)
app.use(express.static(path.resolve("./public")))
try{
    app.get("/", (req, res) => {
        return res.sendFile("/public/index.html")
    })
}
catch(err){
    console.log('Failed to call',err)
}
io.on('connection', (socket) => {
    console.log('A new user has connected', socket.id)
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ejs
app.set("view engine","ejs");
app.set('views',path.resolve(__dirname,'views'));


const corsOptions = {
    origin: 'http://localhost:8000',
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/validate', validateData, (req, res) => {
    res.json({ MESSAGE: "user is validated successfully" })
})
app.get('/auth', authenicateJwt, (req, res) => {
    res.json({ MESSAGE: "protected route", email: req.email })
})

// Google authentication
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google')
});
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: 'auth/failure',
}))
app.get('/auth/failure', (req, res) => {
    res.send('something went wrong')
})

// DB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected with db"))
    .catch((err) => console.log(err))

const router1 = require('./routes/userRouter.js')
app.use('/api/users', router1)

const router2 = require('./routes/blogRouter.js');
app.use('/api/blogs', router2)


app.get('/', (req, res) => {
    res.send("this is a cors enable process")
})

app.get('/register',(req,res)=>{
    res.render("register")
})
app.get('/login',(req,res)=>{
    res.render("login")
})
app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})

