const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');

const friendRoutes = require('./routes/friend-route');

const userRoute = require('./routes/user-route');//

const app = express();

app.use(bodyParser.json());

app.use('/api/friend', friendRoutes);

app.use('/api/users', userRoute);//

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
})

mongoose
    .connect('mongodb+srv://kainy:testing123@cluster0.osruv.mongodb.net/friend?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
