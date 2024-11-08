const { RateLimiterMySQL } = require('rate-limiter-flexible');

let rateLimiterMySQL = null;

const POINTS = 10;
const DURATION = 60;

const initRateLimiter = (sequelizeConnection) => {
    rateLimiterMySQL = new RateLimiterMySQL({
        storeClient: sequelizeConnection,
        points: POINTS,
        duration: DURATION
    });
};

module.exports = { rateLimiterMySQL, initRateLimiter };
