require('dotenv').config()
require('./db');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const authRoute = require('./api/auth/auth.route');
const studentRoute = require('./api/student/student.route');
const facultyRoute = require('./api/faculty/faculty.route');
const attendanceRoute = require('./api/attendance/attendance.route');
const generalRoute = require('./api/general/general.route');

const { errorHandler, notFound, jwtAuthMiddleware } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('tiny'))
app.use(cors())
app.use(compression());
app.use(express.json());

app.use(express.static("dist"));

app.use('/auth', authRoute);

app.use('/api', jwtAuthMiddleware);

app.use('/api/student', studentRoute);
app.use('/api/faculty', facultyRoute);
app.use('/api/general', generalRoute);
app.use('/api/attendance', attendanceRoute);

app.get('/lol', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.json({
        message: "hello"
    })
})


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listerning on port ${PORT}`))