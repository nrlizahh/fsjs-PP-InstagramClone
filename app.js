const express = require('express')
const Controller = require('./controllers/controller.js')
const upload  = require("./middleware/uploadConfig.js")
const path = require('path')
const UserController = require('./controllers/UserController.js')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', UserController.home)
app.post('/login', UserController.login)
app.get('/register', UserController.register)
app.post('/register', UserController.postRegister )
app.get('/profile/:userId', Controller.profilePage)
app.get('/profile/:userId/edit', Controller.renderUserEdit)
app.post('/profile/:userId/edit', upload.single('avatar'), Controller.handlerUserEdit)
app.get('/profile/:userId/add', Controller.renderAddPost)
// app.post('/profile/:userId/add', upload.single('avatar'), Controller.handlerAddPost)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
   })
   