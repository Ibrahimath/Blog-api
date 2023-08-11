




const register = async (req, res) => { 

    const { surname, othernames, email, user_id, password, username ,about_me} = req.body;
    try { 
        //validate the request body first before proceeding
        
        //check if the user already exists
        const user = await models.users.findOne({
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
        await models.Users.create({
            user_id: uuidv4(),
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
        res.status(code || 500).json({
            status: false,
            message: message || 'Something went wrong'
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
            email: user.dataValues.email_address,
            _id: uuidv4()
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