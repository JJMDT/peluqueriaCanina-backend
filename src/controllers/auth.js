const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 'error 400', message: 'Email y contraseña son obligatorios' });
    }
    try {
        //buscamos el usuario en la bbdd
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ status: 'error 404', message: 'Usuario no encontrado' });
        }
        //comparamos la contraseña
        const validarPassword = await bcrypt.compare(password, user.password);
        if (!validarPassword) {
            return res.status(401).json({ status: 'error 401', message: 'Contraseña incorrecta' });
        }
        //generamos el token
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '10d'
            }
        )
        res.status(200).json({
            status: 'success 200',
            message: 'Inicio de sesión exitoso',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    rol: user.rol,
                    dni: user.dni
                },
                token
            }
        });
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ status: 'error 500', message: error.message });
    }
}


module.exports = { login };