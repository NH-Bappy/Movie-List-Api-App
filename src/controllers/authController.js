const { prisma } = require('../config/db')
const bcrypt = require('bcryptjs')




const registration = async (req,res) => {

    try {
    const { name , email , password } = req.body;
    
    //input validation
    if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
}


    const normalizedEmail = email.toLowerCase();

    // check if User is already exists or not
    const sameUser = await prisma.user.findUnique({
        where: {email : normalizedEmail},
    });

    if(sameUser){
        return res
        .status(400)
        .json({error: "user already exists with this email"});
    }

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password , salt)

    //create User

    const user = await prisma.user.create({
        data: {
            name, 
            email,
            password : hashPassword ,
        },
    });
    // successful message
    res.status(201).json({
        status: "success" ,
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
    });
    } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ error: "Internal server error" });
    }

};


module.exports = {registration};
