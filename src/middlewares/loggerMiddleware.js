const fs = require('fs');

function loggerMiddleware(req, res, next) {
    const logData = `Date -> ${new Date().toLocaleDateString()} Time -> ${new Date().toLocaleTimeString()} Host -> ${req.headers.host} url -> ${req.originalUrl} method -> ${req.method}\n`;

    fs.appendFile('log.txt', logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next();
}

module.exports = loggerMiddleware;
