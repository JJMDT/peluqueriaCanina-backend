const { User } = require('../models/user')

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body
        const createUser = await User.create({name , email})
        res.status(200).json({status:"success" , message:'Usuario creado', data: createUser })
    } catch (error) {
        res.status(404).json({status:"error" , message: error.message})
    }
}

module.exports = { createUser }