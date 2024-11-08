'use strict'

const { DataTypes, Model } = require('sequelize')
const { sequelize, getTableConfigs } = require('../config/mysql.js')

class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define association here
    }
}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },
        country_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isNumeric: true,
                len: [10, 15]
            }
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isNumeric: true,
                len: [4, 6]
            }
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        ...getTableConfigs(sequelize, 'users'),
        sequelize,
        modelName: 'User',
    }
)

module.exports = User

