const express = require('express')
const Controller = require('./controllers/controller.js')
const upload  = require("./middleware/uploadConfig.js")
const path = require('path')
const UserController = require('./controllers/UserController.js')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', UserController.home)
app.get('/register', UserController.register)
app.post('/register', UserController.postRegister )
app.post('/login', UserController.login)
app.get('/profile/:userId', Controller.profilePage)
app.get('/profile/:userId/edit', Controller.renderProfileEdit)
// app.post('/profile/:userId/edit', Controller.handlerProfileEdit)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
   })
   