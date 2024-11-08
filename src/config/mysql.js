const { Sequelize, Model } = require('sequelize');
const configEnv = require('../utils/configEnv.js');
const _ = require('lodash');

const sequelize = new Sequelize(configEnv.DB_DATABASE_NAME, configEnv.DB_USERNAME, configEnv.DB_PASSWORD, {
    host: configEnv.DB_HOST,
    port: configEnv.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
        min: 0,
        max: 50,
        idle: 10000,
        acquire: 60000,
        evict: 1000
    }
});

const getTableConfigs = (sequelize, tableName = '', excludeFields = []) => {
    return _.omit(
        {
            timestamps: true,
            sequelize,
            tableName: tableName,
            paranoid: false,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        excludeFields
    );
};

module.exports = { sequelize, Model, getTableConfigs };
