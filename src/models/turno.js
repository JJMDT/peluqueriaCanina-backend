const {DataTypes} = require('sequelize')
const {sequelizeConfig} = require('../config/db')
const User = require('./user')

const Turno = sequelizeConfig.define(
    "Turno", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
      fecha:{
        type: DataTypes.DATEONLY,
        allowNull:false
      },
      hora:{
        type :DataTypes.TIME,
        allowNull:false
      },

      userId:{
        type: DataTypes.UUID,
        allowNull:false,
        references: {
            model: User,
            key:'id'
        }
      },
      servicioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id'
        }
      }
    },
    {
        timestamps: true,
        tableName:'turnos'
    }
)

Turno.belongsTo(User, {foreignKey:'userId'})
User.hasMany(Turno, {foreignKey: 'userId'})

Turno.belongsTo(Servicio, {foreignKey: 'servicioId'})
Servicio.hasMany(Turno, {foreignKey: 'servicioId'})

module.exports = Turno;