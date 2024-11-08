
require('dotenv-flow').config();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const router = require('./router/index.js');
const httpError = require('./utils/httpError.js');
const responseMessage = require('./constant/responseMessage.js');
const globalErrorHandler = require('./middleware/globalErrorHandler.js');

const app = express();

// Set up middleware
app.use(helmet());
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['https://client.com'],
        credentials: true
    })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Default route
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcome to ${process.env.PROJECT_NAME} backend</h1>`);
});

// Routes
app.use('/api', router);

// 404 handler
app.use((req, res, next) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'));
    } catch (err) {
        httpError(next, err, req, 404);
    }
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
