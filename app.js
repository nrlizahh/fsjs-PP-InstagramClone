const express = require('express')
const Controller = require('./controllers/controller.js')
const upload  = require("./middleware/uploadConfig.js")
const path = require('path')
const UserController = require('./controllers/UserController.js')
const app = express()
const session = require('express-session')
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
    cookie: {secure:false,  sameSite: true},

}))


//user
app.get('/', UserController.home)
app.get('/register', UserController.register)
app.post('/register', UserController.postRegister )
app.post('/login', UserController.login)
const isLoggedin = function(req,res,next) {
    console.log(req.session);
    if (!req.session.userId) {
        const error = 'Please login first!'
        res.redirect(`/?error=${error}`)
    }else{
        next()
    }

}

app.use(isLoggedin)
app.get('/logout', UserController.getLogout)

// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
//   }) //middleware
  


///author
app.get('/profile/:userId', Controller.profilePage)
app.get('/profile/:userId/edit', Controller.renderUserEdit)
app.post('/profile/:userId/edit', upload.single('avatar'), Controller.handlerUserEdit)
app.get('/profile/:userId/add', Controller.renderAddPost)
app.post('/profile/:userId/add', upload.single('imageUrl'), Controller.handlerAddPost)
app.get('/profile/:userId/post/:postId', Controller.detailPost)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
   })

   

