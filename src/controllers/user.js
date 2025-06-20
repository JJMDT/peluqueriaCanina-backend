const User = require("../models/user");
const Shift = require("../models/shift")
const bcrypt = require("bcrypt");
const bunyan = require('bunyan');


const bunyanLog = bunyan.createLogger({ name: 'app' })

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
    bunyanLog.info("Usuario registrado:", user);
    res.status(201).json({ status: "success 201", message: "Usuario creado exitosamente", data: user });;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ status: "error 500", message: error.message })
  }

};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: { // con esto le digo que incluye lo que tiene de la relacion con Shift
        model: Shift
      },
    });
    if (users.length === 0) {
      res.status(404).json({ status: "error", message: "No se encuentran usuarios registrados" });
    }
    res.status(200).json({ status: "success 200", message: "Mostrando todos los usuarios", data: users });
  } catch (error) {
    bunyanLog.error("Error al obtener los usuarios:", error);
    res.status(500).json({ status: "error 500", message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findByPk(id, {
      include: {
        model: Shift
      }
    });
    if (!findUser) {
      const error = new Error(`No se encontro ese usuario , ID: ${id}`);
      error.name = 404;
      throw error;
    }
    return res.status(200).json({ status: "success 200", message: `Mostrando usuario id:${findUser.id}`, data: findUser })
  } catch (error) {
    bunyanLog.error(`Error al obtener User por id`, error);
    res.status(error.name ?? 500).json({ status: `error ${error.name ?? "500"}`, message: error.message });
  }
}

const patchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, dni, email, password } = req.body;
    const findUser = await User.findByPk(id);
    if (!findUser) {
      const error = new Error(`No se encontro ese usuario , ID: ${id}`);
      error.name = 404;
      throw error;
    }
    let hashedPassword = ""
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    await findUser.update({
      name,
      lastName,
      dni,
      email,
      password: hashedPassword ? hashedPassword : findUser.password
    })
    bunyanLog.info(`User id:${findUser.id}`)
    return res.status(200).json({ status: "success 200", message: `Editado Usuario id:${findUser.id}`, data: findUser })
  } catch (error) {
    bunyanLog.error(`Error al editar User por id`, error);
    res.status(error.name ?? 500).json({ status: `error ${error.name ?? "500"}`, message: error.message });
  }
}

module.exports = {
  register,
  getAllUsers,
  getUserById,
  patchUserById
}
