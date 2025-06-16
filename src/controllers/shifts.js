const Shift = require('../models/shift')
const Service = require('../models/service')
const User = require('../models/user')
const QRCode = require('qrcode');

// importamos QRCode para generar el código QR
// importamos el modelo Shift, Service y User

const createShift = async (req, res) => {
  const {date, time, petName, phone, userId, serviceId} = req.body;

  if (!date || !time || !petName || !userId || !serviceId) {
    
    return res.status(400).json({
      status: "error 400",
      message: "Todos los campos son obligatorios"
    });
  }

  try {
    // usamos el metodo findByPk para buscar el servicio por su id (metodo de sequelize) por eso importamos el modelo Service

      const service = await Service.findByPk(serviceId);
      if(!service){
        return res.status(404).json({
          status: "error 404",
          message: "Servicio no encontrado"
        });
      }
      // si el servicio existe, obtenemos el nombre y el precio del servicio
      const serviceName = service.name;
      const servicePrice = service.price;

      // hacemos lo mismo con el usuario, usamos findByPk para buscar el usuario por su id
      const user = await User.findByPk(userId);
      if(!user){
        return res.status(404).json({
          status: "error 404",
          message: "Usuario no encontrado"
        });
      }
      // si el usuario existe, obtenemos los datos necesarios para el QR 
      const name = user.name;
      const lastName = user.lastName;
      const dni = user.dni;
      const email = user.email;


      const newShift = await Shift.create({
        date, 
        time, 
        petName,
        phone: phone ? phone : null,
        userId, 
        serviceId 
      })
      console.log('Turno creado exitosamente:', newShift);

      // generamos el codigo QR con los datos del turno (definimos un objeto con los datos que queremos incluir en el QR)
      const qrDataPayload = {
        idShift: newShift.id,
        name: name,
        lastName:lastName,
        dni: dni,
        email: email,
        serviceName: serviceName,
        servicePrice: servicePrice,
        date: newShift.date,
        time: newShift.time,
        petName: newShift.petName,
      }
      // convertimos el objeto a JSON y genemos el codigo QR
      const qrDataString = JSON.stringify(qrDataPayload);

      // usamos la libreria QRCode para generar el codigo QR en formato de imagen
      const qrCodeImage = await QRCode.toDataURL(qrDataString);

      console.log('QR Code datra url:', qrCodeImage);

      // respondemos al cliente con el turno creado y el codigo QR
      res.status(201).json({
        status: "success 201",
        message: "Turno creado exitosamente",
        data: newShift,
        dataShift: qrDataPayload,
        qrCode: qrCodeImage,
      });
  } catch (error) {
      console.log("Error al crear turno" , error)
      res.status(500).json({
        status: "error 500",
        message: error.message
      });
    
}
}
  
  module.exports = {createShift}