const User = require('../models/User');

const register = async(req,res) => {
    const {name,lastName, dni, email, password} = req.body;

    if (!name || !lastName || !dni || !email || !password) {
        return res.status(400).send('Faltan datos obligatorios');
    }

    try {
        const user = await User.create({
            name,
            lastName,
            dni,
            email,
            password
        })
        console.log('Usuario registrado:', user);
        res.status(201).send('Usuario registrado exitosamente');
    }
    catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).send('Error interno del servidor');
    }
  


}
module.exports = register;