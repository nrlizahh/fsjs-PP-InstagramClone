const { Post, PostTag, Profile, Tag, User} = require('../models')
const { Op,} = require("sequelize")
const { timeAgo } = require('../helper/helper')

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
            const {error} = req.query
            const { userId } = req.params;
            let user = await User.findOne({
                where: { id: userId }, 
                include: [{
                  model: Profile,
                  as: 'profile' 
                }]
              })
            res.render('editProfile', {user, error})
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
            const { userId } = req.params
            if(error.name === 'SequelizeValidationError'){
                let err = error.errors.map((el) =>  el.message)
                res.redirect(`/profile/${userId}/edit?error=${err}`)
            }else{
                res.send(error)
            }
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
                    }
                ]
            });
            let tag = await Tag.findAll()

            res.render('addPost', { user, tag });
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAddPost (req, res){
        try {
            const { userId } = req.params;
            // const { filename } = req.file
            console.log(req)
            if (req.file) {
                const photoUrl = req.file.path;  
                let newPost = await Post.create({
                    userId: userId,
                    photoUrl: photoUrl,  
                });
            }
           
            // Redirect ke halaman profil user setelah foto di-upload
            res.redirect(`/profile/${userId}`);
        } catch (error) {
            res.send(error)
        }
        
    }

    static async detailPost (req, res){
        try {
            const { userId, postId } = req.params;
            const { imageUrl, caption, createdDate } = post;
            const post = await Post.findOne({
                where: { id: postId, userId: userId }, 
                include: {
                  model: Tag,
                  attributes: ['tagName'] 
                }
              });
            const tags = post.Tags.map(tag => tag.tagName);

            res.render('postDetail', {imageUrl, caption, createdDate,tags,userId,postId});
        } catch (error) {
            res.send(error)
        }
    }


    

}

module.exports = Controller