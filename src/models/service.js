// se crea la base directamente desde acá
const { DataTypes } = require('sequelize')
const { sequelizeConfig } = require('../config/db')

const Service = sequelizeConfig.define(
    "Service",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "service",
    }
);

module.exports = Service;