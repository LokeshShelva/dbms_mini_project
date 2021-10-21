require('dotenv')
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('tiny'))

app.use(express.static("dist"));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})

app.get('/api', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.json({
        message: "hello"
    })
})

app.listen(PORT, () => console.log(`Listerning on port ${PORT}`))