const logger = require('./logger.js');
const config = require('./configEnv.js');
const responseMessage = require('../constant/responseMessage.js');
const { EApplicationEnvironment } = require('../constant/application.js');

module.exports = (err, req, errorStatusCode = 500) => {
    const errorObject = {
        success: false,
        statusCode: errorStatusCode,
        // request: {
        //     ip: req.ip ?? null,
        //     method: req.method,
        //     url: req.originalUrl
        // },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: {},
        trace: err instanceof Error ? { error: err.stack } : null
    };
    
    // log
    logger.error(`CONTROLLER_ERROR`, {
        meta: errorObject
    });
    
    // production env check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObject.request.ip;
        delete errorObject.trace;
    }
    
    return errorObject;
};
