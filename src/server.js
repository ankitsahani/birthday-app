const app = require('./app.js');
const config = require('./utils/configEnv.js');
// const { initRateLimiter } = require('./config/rateLimiter');
const databaseService = require('./service/databaseService.js');
const logger = require('./utils/logger.js');

const server = app.listen(config.PORT);

(async () => {
    try {
        // Database Connection
        const connection = await databaseService.connect();
        logger.info('DATABASE_CONNECTION', {
            meta: {
                CONNECTION_NAME: connection
            }
        });
        logger.info('APPLICATION_STARTED', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        });
        // Rate-Limit SetUp
        // initRateLimiter(connection)
        // logger.info('RATE_LIMITER_INITIATED')
    } catch (error) {
        logger.error('APPLICATION_ERROR', {
            meta: error
        });
        server.close((err) => {
            if (err) {
                logger.error('APPLICATION_ERROR', {
                    meta: err
                });
            }
            process.exit(1);
        });
    }
})();
