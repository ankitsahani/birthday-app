const util = require('util')
const path = require('path')
const config = require('./configEnv.js')
const sourceMapSupport = require('source-map-support')
const { createLogger, format, transports } = require('winston')
const { blue, red, yellow, green, magenta } = require('colorette')
const { EApplicationEnvironment } = require('../constant/application.js')

// Linking Trace Support
sourceMapSupport.install()

// Colors for log levels
const colorizedLevel = (level) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARNING':
            return yellow(level)
        default:
            return level
    }
}

// Console log format
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const customLevel = colorizedLevel(level.toUpperCase())
    const customTimestamp = green(timestamp)
    const customMessage = message
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })
    return `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`
})

// Console transport setup
const consoleTransport = () => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

// File log format
const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const logMeta = {}

    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack ?? ''
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: colorizedLevel(level.toUpperCase()),
        message,
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

// File transport setup
const fileTransport = () => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

// MySQL transport setup using Sequelize

// Main logger setup
module.exports = createLogger({
    defaultMeta: { meta: {} },
    transports: [...fileTransport(), ...consoleTransport()]
})
