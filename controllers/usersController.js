const { Op } = require('sequelize');
const { hashPassword, comparePassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const { uuid } = require('uuidv4')
const models = require('../models')
const sequelize = require('sequelize');
const { validateEditProfile, validateRegister,
    validatePost, validateEditPost,
    validateAddComment, validateEditComment,
    validateReactionToPost} = require('../Validations');


// models.Post.hasMany(models.Comments, { foreignKey: 'post_id' });
// models.Comments.belongsTo(models.Post, { foreignKey: 'post_id' });
// models.Users.hasMany(models.Post, { foreignKey: 'user_id' });
// models.Post.belongsTo(models.Users, { foreignKey: 'user_id' });
// models.Users.hasMany(models.Comments, { foreignKey: 'user_id' });
// models.Comments.belongsTo(models.Users, { foreignKey: 'user_id' });
// models.Post.hasMany(models.Reactions, { foreignKey: 'post_id' });
// models.Reactions.belongsTo(models.Post, { foreignKey: 'post_id' });

const register = async (req, res) => { 
    try{
    const { surname, othernames, email, user_id, password, username ,about_me} = req.body;
    
        //validate the request body first before proceeding
        
        //check if the user already exists
        const user = await models.user.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        })
        if (user) {
          
            throw new Error({
                code: 400,
                message:'User already exists'
            });
        }
        //create the user
        const { hash} = await hashPassword(password);
        await models.user.create({
            user_id: uuid(),
            surname,
            othernames,
            email: email,
            user_id,
            username,
            about_me,
            password_hash: hash
        })
        res.status(201).json({
            status: true,
            message: 'User created successfully',
        })


    } catch (err) { 
        const { code, message } = err
        console.log(err.message || err);
        res.status(code || 500).json({
            status: false,
            message: message || 'Something went wrong',
        });
    }

}

const login = async (req, res) => { 
    
    const { email, password } = req.body
    try { 
        if (!email || !password) {
            res.status(400)
            throw new Error('All fields are required');
        } 
        //check if the user already exists
        const user = await models.Users.findOne({
            where: {email}
        })

     
        if (!user) {
            res.status(400)
            throw new Error('Invalid credentials');
        }
        //check if the password is correct
        const checkPasssword = await comparePassword(password, user.dataValues.password_hash)
        if (!checkPasssword) {
            res.status(400)
            throw new Error('Invalid credentials');
        }
        //generate token
        const token = jwt.sign({
            email: user.dataValues.email,
            _id: uuid()
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: true,
            message: 'User logged in successfully',
            token
        })
    } catch (err) { 
        res.json({
            status: false,
            message: err.message
        });
    }
}

module.exports = {register, login}