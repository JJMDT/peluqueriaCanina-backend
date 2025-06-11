const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ status: 'error 401', message: 'Token requerido' });
    }

    try{
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded; // Guardamos la información del usuario decodificada en el objeto de solicitud
        next(); // Llamamos al siguiente middleware o ruta
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(403).json({ status: 'error 403', message: 'Token inválido' });
    }
}
module.exports = verifyToken;