const { Post, PostTag, Profile, Tag, User} = require('../models')
const { Op, ValidationErrorItemType } = require("sequelize")

class Controller {
   
    static async profilePage(req, res){
        const { userId } = req.params 
        console.log(req.params);
               
        try {
            let user = await User.findOne({
                where: { id: userId }, 
                include: [{
                  model: Profile,
                  as: 'profile' 
                }]
              })
              console.log(user, "========" )
            res.render('profile', {user})
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async renderProfileEdit(req, res) {
        try {
            const { userId } = req.params;
            let user = await User.findOne({
                where: { id: userId }, 
                include: [{
                  model: Profile,
                  as: 'profile' 
                }]
              })
              console.log(user )
            res.render('editProfile', {user})
        } catch (error) {
          res.send(error);
        }
      }
    
    static async handlerEditArts(req, res) {
    try {
        const { username, fullName, biodata, photoProfile} = req.body;
        const { userId } = req.params;
        await User.update(
        { username, fullName, biodata, photoProfile},
        {
            where: {
            id : userId,
            },
        }
        );
        res.redirect(`/profile/${userId}`);
    } catch (error) {
        console.log(error);
        
        res.send(error);
    }
    }

}

module.exports = Controller