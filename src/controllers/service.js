const Service  = require ('../models/service')

const createService = async (req, res) => {
    try {
        const { name, description, price } = req.body 
        if (!name || !description || !price) {
            return res.status(400).json({ error: "Todos los campos son obligatorios"})
        }
        const newService = await Service.create({
            name, description, price
        })
        res.status(201).json(newService)
    } catch (error) {
        console.log("Error al crear servicio" , error)
        res.status(500).json({ error: "Hubo un problema al crear el servicio" })
    }
}

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        if (services.length === 0) {
            return res.status(404).json({ status: "error", message: "No se encuentran servicios registrados" });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
        res.status(500).json({ status: "error 500", message: error.message });
    }
}
      
module.exports = { createService, getAllServices } 