const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/fmm', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['secretvalue'],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

const events = require('./events');
app.use(`/api/events`, events.routes);

const admin = require('./admin.js');
app.use(`/api/admin`, admin.routes);

const photos = require('./photos.js');
app.use(`/api/photos`, photos.routes);

let port = 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));