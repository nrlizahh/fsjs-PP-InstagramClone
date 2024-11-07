const { Post, PostTag, Profile, Tag, User} = require('../models')
const { Op,} = require("sequelize")
const { timeAgo } = require('../helper/helper')

class Controller {
   
    static async profilePage(req, res){
        const { userId } = req.params 
        try {
            let user = await User.getUserPosts(userId)
            
            res.render('profile', {user})
        } catch (error) {
            res.send(error)
        }
    }

    static async renderUserEdit(req, res) {
        try {
            const {error} = req.query
            const { userId } = req.params;
            let user = await User.getUserProfile(userId)
            res.render('editProfile', {user, error})
        } catch (error) {
          res.send(error);
        }
      }
    
      static async handlerUserEdit(req, res) {
        try {
            const { username, fullName, biodata, gender} = req.body;
            const { userId } = req.params;
            let file = req.file
            let filename = null
            if(file) {
                filename = file.path 
                ? `http://localhost:3000/${file.path}`
                : null
            }


            await User.update(
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
                let payload = {
                    biodata, 
                    gender
                }
                if(filename) {
                    payload.photoProfile = filename
                }

                console.log(payload)

                await Profile.update(
                    payload,  
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
                    photoProfile: filename, 
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
            const {error} = req.query
            // Mencari user berdasarkan userId
            let user = await User.findByPk(userId);
            let tag = await Tag.findAll()

            res.render('addPost', { user, tag, error });
        } catch (error) {
            console.log(error, "=========");
            
            res.send(error)
        }
    }

    static async handlerAddPost (req, res){
        try {
            const { userId } = req.params;
            const { caption, tags } = req.body

            if (req.file) {
                let file = req.file
                const photoUrl = file.path 
                ? `http://localhost:3000/${file.path}`
                : null

                let newPost = await Post.create({
                    UserId: userId,
                    imageURL: photoUrl,
                    createdDate: new Date(),
                    caption
                });

                if (tags && tags.length > 0) {
                    let payload = tags.map((el) => {
                        return {
                            TagId: el,
                            PostId: newPost.id
                        }
                    })
                    await PostTag.bulkCreate(payload)
                }
            } else {
                return res.redirect(`/profile/${userId}/add?error=Please%20add%20photo`)
            }
            res.redirect(`/profile/${userId}`);
        } catch (error) {
            const { userId } = req.params;
            if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
                let err = error.errors.map((el) =>  el.message)
                res.redirect(`/profile/${userId}/add?error=${err}`)
            }else{
                res.send(error)
            }
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