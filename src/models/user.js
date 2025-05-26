const { DataTypes } = require('sequelize')
const { sequelizeConfig } = require('../config/db')

const User = sequelizeConfig.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = { User }