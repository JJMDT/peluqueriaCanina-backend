// importamos el modelo Shift, Service y User
const Shift = require("../models/shift");
const Service = require("../models/service");
const User = require("../models/user");
// importamos QRCode para generar el código QR
const QRCode = require("qrcode");
//importamos los horarios validos desde un archivo utils
const VALID_TIMES  = require("../utils/timeSlots");

const createShift = async (req, res) => {
  const { date, time, petName, phone, userId, serviceId } = req.body;

  // validamos que la fecha sea una fecha valida y este incluida en la variable VALID_TIMES
  if (!VALID_TIMES.includes(time)) {
    return res.status(400).json({
      message: "Horario inválido.",
    });
  }
  // validamos que la fecha y hora no se repita, buscamos en la bbdd si ya existe un turno con esa misma fecha y hora
  const conflict = await Shift.findOne({ where: { date, time } });
  if (conflict) {
    return res
      .status(400)
      .json({ message: "Ya existe un turno para esta fecha y hora." });
  }
  // validamos que todos los campos obligatorios esten presentes
  if (!date || !time || !petName || !userId || !serviceId) {
    return res.status(400).json({
      status: "error 400",
      message: "Todos los campos son obligatorios",
    });
  }

  try {
    
    // usamos el metodo findByPk para buscar el servicio por su id (metodo de sequelize) por eso importamos el modelo Service
    /// puede que esta funcion de buscar si el servicio exista no sea necesaria si ya validamos que el id del servicio es correcto en el frontend
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({
        status: "error 404",
        message: "Servicio no encontrado",
      });
    }

    // hacemos lo mismo con el usuario, usamos findByPk para buscar el usuario por su id
    /// puede que esta funcion de buscar si el usuario exista no sea necesaria si ya validamos que el id del usuario es correcto en el frontend
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        status: "error 404",
        message: "Usuario no encontrado",
      });
    }
    
    // si todo esta correcto, creamos el turno con los datos recibidos en el body de la peticion
    const newShift = await Shift.create({
      date,
      time,
      petName,
      phone: phone ? phone : null,
      userId,
      serviceId,
    });
    console.log("Turno creado exitosamente:", newShift);

    // generamos el codigo QR con los datos del turno (definimos un objeto con los datos que queremos incluir en el QR)
    const qrDataPayload = {
      idTurno: newShift.id,
      date: newShift.date,
      time: newShift.time,
      petName: newShift.petName,
      service: {
        name: service.name,
        price: service.price,
      },
      usuario: {
        name: user.name,
        lastName: user.lastName,
        dni: user.dni,
        email: user.email,
        telefono: user.phone,
      },
    };
    // convertimos el objeto a JSON y genemos el codigo QR
    const qrDataString = JSON.stringify(qrDataPayload);

    // usamos la libreria QRCode para generar el codigo QR en formato de imagen
    const qrCodeImage = await QRCode.toDataURL(qrDataString);

    console.log("QR Code data url:", qrCodeImage);

    // respondemos al cliente con el turno creado y el codigo QR
    res.status(201).json({
      status: "success 201",
      message: "Turno creado exitosamente",
      dataShift: qrDataPayload,
      qrCode: qrCodeImage,
    });
  } catch (error) {
    console.log("Error al crear turno", error);
    res.status(500).json({
      status: "error 500",
      message: error.message,
    });
  }
};


module.exports = { createShift };
