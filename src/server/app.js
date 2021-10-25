require('dotenv').config()
require('./db');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const authRoute = require('./auth/auth.route');
const { errorHandler, notFound } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('tiny'))
app.use(cors())
app.use(compression());
app.use(express.json());

app.use(express.static("dist"));

app.get('/api', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.json({
        message: "hello"
    })
})

app.use('/auth', authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listerning on port ${PORT}`))