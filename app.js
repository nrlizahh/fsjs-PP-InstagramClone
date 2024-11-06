const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', Controller.home)
app.get('/profile', Controller.profilePage)
app.get('/user/:id', Controller.renderUserEdit)
// app.post('/user/:id', Controller.handlerUserEdit)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
   })
   