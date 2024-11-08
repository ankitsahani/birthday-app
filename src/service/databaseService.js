const { update } = require('lodash')
const { sequelize } = require('../config/mysql.js')
const User = require('../models/user.js')
const { where } = require('sequelize')

module.exports = {
    connect: async () => {
        try {
            const connection = await sequelize.sync()
            if (connection) {
                return sequelize.config.database
            }
        } catch (error) {
            throw error
        }
    },
    findUserByPhoneNumber: (country_code, phone_number) => {
        return User.findOne({ where: { country_code, phone_number } })
    },
    createUser: (userData) => {
        return User.create(userData)
    },
    updateUserProfile: (userId, data) => {
        return User.update(data, { where: { id: userId } })
    }
}
