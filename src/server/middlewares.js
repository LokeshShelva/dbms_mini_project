
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

module.exports = {
    errorHandler,
    notFound
}