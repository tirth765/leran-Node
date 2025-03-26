// npm bcrypt download for creating hash password
const bcrypt = require('bcrypt');
const Users = require("../models/users.model")

const user_register = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log(email, password);


        const user = await Users.findOne({ email: email })

        if (user) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: 'user is already exist'
                })
        }

        try {

            const hashPassword = await bcrypt.hash(password, 10)
            console.log(hashPassword);

            const User = await Users.create({...req.body , password : hashPassword})

            const userData = await Users.findById(User._id).select('-password')

            return res.status(201)
            .json({
                success : true,
                data : userData,
                message : 'successFull data add'
            })

        } catch (error) {
            return res.status(500)
                .json({
                    success: false,
                    data: [],
                    message: 'error in server' + error.message
                })
        }


    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: 'error in server' + error.message
            })
    }
}

const user_login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                data: [],
                message: 'User not found'
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                data: [],
                message: 'Invalid password'
            });
        }

        // If login successful, return user data without password
        const userData = await Users.findById(user._id).select('-password');

        return res.status(200).json({
            success: true,
            data: userData,
            message: 'Login successful'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'Error in server: ' + error.message
        });
    }
}

module.exports = {
    user_register,
    user_login
}