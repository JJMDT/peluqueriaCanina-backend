const { DataTypes } = require('sequelize')
const { sequelizeConfig } = require('../config/db')

const Servicio = sequelizeConfig.define(
    "Servicio", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        duracion: {
            type: DataTypes.INTEGER, // duración en minutos
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'servicios'
    }
)

module.exports = Servicio; 