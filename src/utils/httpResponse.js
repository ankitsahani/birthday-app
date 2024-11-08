const logger = require('./logger.js');
const config = require('./configEnv.js');
const { EApplicationEnvironment } = require('../constant/application.js');

module.exports = (req, res, responseStatusCode, responseMessage, data = null) => {
    const response = {
        success: true,
        statusCode: responseStatusCode,
        // request: {
        //     ip: req.ip ?? null,
        //     method: req.method,
        //     url: req.originalUrl
        // },
        message: responseMessage,
        data: data
    };
    
    // log
    logger.info(`CONTROLLER_RESPONSE`, {
        meta: response
    });
    
    // production env check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }
    
    res.status(responseStatusCode).json(response);
};
