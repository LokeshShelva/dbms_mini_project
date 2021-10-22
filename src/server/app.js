require('dotenv').config()
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('tiny'))
app.use(cors())

app.use(express.static("dist"));

app.get('/api', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.json({
        message: "hello"
    })
})

app.listen(PORT, () => console.log(`Listerning on port ${PORT}`))