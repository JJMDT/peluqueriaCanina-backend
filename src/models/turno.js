const {DataTypes} = require('sequelize')
const {sequelizeConfig} = require('../config/db')
const User = require('./user')
const Servicio = require('./servicio')

const Turno = sequelizeConfig.define(
    "Turno", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
      fecha:{
        type: DataTypes.DATEONLY,
        allowNull:false
      },
      hora:{
        type :DataTypes.TIME,
        allowNull:false
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      servicioId: {
        type: DataTypes.UUID,
        allowNull:false,
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

Turno.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Turno, { foreignKey: 'userId', onDelete: 'CASCADE' });

Turno.belongsTo(Servicio, { foreignKey: 'servicioId', onDelete: 'CASCADE' });
Servicio.hasMany(Turno, { foreignKey: 'servicioId', onDelete: 'CASCADE' });

module.exports = Turno;