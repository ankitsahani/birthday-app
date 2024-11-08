const errorObjects = require('./errorObjects.js');

module.exports = (nextFunc, err, req, errorStatusCode = 500) => {
    const errorObj = errorObjects(err, req, errorStatusCode);
    return nextFunc(errorObj);
};
