const Shift = require('../models/shift')

const createShift = async (req, res) => {
  const {date, time, petName, phone, userId, serviceId} = req.body;

  if (!date || !time || !petName || !userId || !serviceId) {
    
    return res.status(400).json({
      status: "error 400",
      message: "Todos los campos son obligatorios"
    });
  }

  try {
      const newShift = await Shift.create({
        date, 
        time, 
        petName,
        phone: phone ? phone : null,
        userId, 
        serviceId 
      })
      console.log('Turno creado exitosamente:', newShift);
      res.status(201).json({
        status: "success 201",
        message: "Turno creado exitosamente",
        data: newShift
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