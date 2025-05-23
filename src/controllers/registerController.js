

const register = (req,res) => {
    const {name,lastName, dni, email, password} = req.body;

    if (!name || !lastName || !dni || !email || !password) {
        return res.status(400).send('Faltan datos obligatorios');
    }
    console.log("registro exitoso");
    res.send(`registro exitoso`);

}
module.exports = register;