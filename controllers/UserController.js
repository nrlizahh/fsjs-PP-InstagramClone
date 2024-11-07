const { Post, PostTag, Profile, Tag, User} = require('../models')
const bcrypt = require('bcrypt');

class UserController{
    static async home (req, res){
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res){
        try {
            const {username, password} = req.body
            let data = await User.findOne({where: {username}})

            if(data){
                const isValidPassword =bcrypt.compareSync(password, data.password)
                if(isValidPassword){
                    return res.redirect(`/profile/${data.id}`)
                }else {
                    const error = "invalid password"
                    return res.redirect(`/?error=${error}`)
                }
            }
            else{
                const error = "invalid user"
                return res.redirect(`/?error=${error}`)
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async register(req, res){
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res){
        try {
            //create user baru (username, password, role, email)

            const {username, password, role, email, fullName} = req.body
            await User.create({ username, password, role, email, fullName })

            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController