const { Post, PostTag, Profile, Tag, User} = require('../models')
const { Op, ValidationErrorItemType } = require("sequelize")

class Controller {
   
    static async profilePage(req, res){
        const { userId } = req.params 
        try {
            let user = await User.findOne({
                where: { id: userId }, 
                include: [{
                  model: Profile,
                  as: 'profile' 
                }]
              })
            res.render('profile', {user})
        } catch (error) {
            res.send(error)
        }
    }

    static async renderUserEdit(req, res) {
        try {
            const { userId } = req.params;
            let user = await User.findOne({
                where: { id: userId }, 
                include: [{
                  model: Profile,
                  as: 'profile' 
                }]
              })
            res.render('editProfile', {user})
        } catch (error) {
          res.send(error);
        }
      }
    
      static async handlerUserEdit(req, res) {
        try {
            const { username, fullName, biodata, photoProfile, gender} = req.body;
            const { userId } = req.params;
            const { filename } = req.file
            let updUser = await User.update(
                { username, fullName },
                {
                    where: {
                    id : userId,
                    },
                }
            );
            let findProfile = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })
            if (findProfile) {
                await Profile.update(
                    { 
                        biodata, 
                        gender, 
                        photoProfile: filename || ''},  
                    {
                        where: {
                        UserId : userId,
                        },
                    }
                );
            } else {
                await Profile.create({ 
                    biodata, 
                    gender, 
                    photoProfile: filename || '', 
                    UserId: userId
                });
            }

            res.redirect(`/profile/${userId}`);
        } catch (error) {
            console.log(error, "error edit")
            res.send(error);
        }
    }
    
    static async renderAddPost(req, res){
        try {
            const { userId } = req.params;
        
            // Mencari user berdasarkan userId
            let user = await User.findOne({
                where: { id: userId },
                include: [
                    {
                        model: Post, 
                        include: [
                            {
                                model: Tag      
                            }
                        ]
                    }
                ]
            });
            console.log(user);
            
            // Render template dengan data user
            res.render('addPost', { user });
        } catch (error) {
            
        }
    }

}

module.exports = Controller