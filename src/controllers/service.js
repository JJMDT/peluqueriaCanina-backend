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

module.exports = { createService } 