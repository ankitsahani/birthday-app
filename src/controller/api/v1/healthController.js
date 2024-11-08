const responseMessage = require('../../../constant/responseMessage.js');
const httpResponse = require('../../../utils/httpResponse.js');
const httpError = require('../../../utils/httpError.js');
const quickers = require('../../../utils/quickers.js');

module.exports = {
    self: (req, res, next) => {
        try {
            const message = 'Api Working...';
            httpResponse(req, res, 200, responseMessage.SUCCESS, { message });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    health: (req, res, next) => {
        try {
            const healthData = {
                application: quickers.getApplicationHealth(),
                system: quickers.getSystemHealth(),
                timestamp: Date.now()
            };
            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
        } catch (err) {
            httpError(next, err, req, 500); // This was missing in the original code
        }
    }
};
