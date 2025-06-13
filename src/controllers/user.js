const User = require("../models/user");
const bcrypt = require("bcrypt");
const Turno = require("../models/turno");
const Servicio = require("../models/servicio")

const register = async (req, res) => {
  const { name, lastName, dni, email, password } = req.body;

  if (!name || !lastName || !dni || !email || !password) {
    return res
      .status(400)
      .json({
        status: "error 400",
        message: "Todos los campos son obligatorios",
      });
  }

  try {
    const dniExists = await User.findOne({ where: { dni } });
    if (dniExists) {
      return res
        .status(400)
        .json({ status: "error 400", message: "DNI ya registrado" });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res
        .status(400)
        .json({ status: "error 400", message: "Email ya registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      lastName,
      dni,
      email,
      password: hashedPassword,
    });
    console.log("Usuario registrado:", user);

    res.status(201).json({status: "success 201", message: "Usuario creado exitosamente",data:user});;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({status:"error 500" , message: error.message})  }

};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      res.status(404).json({status:"error" , message: "No se encuentran usuarios registrados"});
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
   res.status(500).json({status:"error 500" , message: error.message});
  }
};

const turno = async(req,res) => {
  const {fecha, hora, nombreMascota,telefono, userId, servicioId} = req.body;

  if (!fecha || !hora || !userId || !servicioId) {
    return res.status(400).json({
      status: "error 400",
      message: "Todos los campos son obligatorios "
    });
  }

  try {
    const nuevoTurno = await Turno.create({
      fecha,
      hora,
      nombreMascota,
      telefono: telefono ? telefono :null,
      userId,
      servicioId
    });

    res.status(201).json({
      status: "success 201",
      message: "Turno creado exitosamente",
      data: nuevoTurno
    });
  } catch (error) {
    console.error("Error al crear el turno:", error);
    res.status(500).json({
      status: "error 500",
      message: error.message
    });
  }
}


const crearServicio = async (req,res) => {
  try {
    const { name, description, price } = req.body;

    // Validación básica
    if (!name || !description || !price ) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    const nuevoServicio = await Servicio.create({
      name,
      description,
      price,
    });

    res.status(201).json(nuevoServicio);
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(500).json({ error: "Hubo un problema al crear el servicio" });
  }
}
module.exports = { register, getAllUsers, turno, crearServicio };
