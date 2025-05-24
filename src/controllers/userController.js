const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).send('No se encontraron usuarios');
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return res.status(500).send('Error interno del servidor');
    }
}
module.exports = {getAllUsers};