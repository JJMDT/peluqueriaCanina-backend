const {DataTypes} = require('sequelize');
const sequelize = require('../DataBase/database');

const User = sequelize.define('User', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dni:{
    type: DataTypes.INTEGER, // <--- CAMBIA ESTO
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol:{
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
},{
    timestamps: true,
    tableName: 'users'
}
);

module.exports = User;