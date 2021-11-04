const jwt = require('jsonwebtoken');

const errorHandler = (error, req, res, next) => {
    const statusCode =
        res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        status: statusCode,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
        errors: error.errors || undefined,
    });
}

const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const jwtAuthMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) {
        res.status(403);
        res.json({
            message: "Unauthorized access"
        })
    }

    const token = header.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403);
            next(err);
        }
        next();
    })
}

module.exports = {
    errorHandler,
    notFound,
    jwtAuthMiddleware
}