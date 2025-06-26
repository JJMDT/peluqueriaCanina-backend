const {DataTypes} = require('sequelize')
const {sequelizeConfig} = require('../config/db')
const User = require('./user')
const Service = require('./service')
const VALID_TIMES  = require("../utils/timeSlots");

const Shift = sequelizeConfig.define(
    "Shift", {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      date:{
        type: DataTypes.DATEONLY,
        allowNull:false
      },
      time:{
        type :DataTypes.STRING,
        allowNull:false,
        validate: {
          isIn: [VALID_TIMES]
        }
      },
      petName:{
        type: DataTypes.STRING,
        allowNull: false
      },
      phone:{
        type: DataTypes.STRING,
        allowNull: true
      }
      ,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      serviceId: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
            model: Service,
            key: 'id'
        }
      }
    },
    {
        timestamps: true,
        tableName:'shifts'
    }
)

Shift.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Shift, { foreignKey: 'userId', onDelete: 'CASCADE' });

Shift.belongsTo(Service, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
Service.hasMany(Shift, { foreignKey: 'serviceId', onDelete: 'CASCADE' });

module.exports = Shift;