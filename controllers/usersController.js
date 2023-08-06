




const register = async (req, res) => { 

    const { surname, othernames, email, password, username } = req.body;
    try { 
        //validate the request body first before proceeding
        const validateData = validateRegister(req.body);
        if (validateData.error) {
            res.status(400)
           
            throw new Error({
                code: 400,
                message: validateData.error.details[0].message
            });
        }
        //check if the user already exists
        const user = await models.Users.findOne({
            where: {
                [Op.or]: [{ email_address: email }, { username }]
            }
        })
        if (user) {
          
            throw new Error({
                code: 400,
                message:'User already exists'
            });
        }
        //create the user
        const { hash, salt } = await hashPassword(password);
        const newUser = await models.Users.create({
            user_id: uuidv4(),
            surname,
            othernames,
            email_address: email,
            username,
            password_hash: hash,
            password_salt: salt
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