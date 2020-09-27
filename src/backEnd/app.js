// app.post('/api/users', mongoose.createUser);

// app.get('/api/users', mongoose.getUsers);
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');

const userRoutes = require('./routes/user-route');

const userTestingRoute = require('./routes/routeTesting');//

const app = express();

app.use(bodyParser.json());

app.use('/api/user', userRoutes);

app.use('/api/users', userTestingRoute);//

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
    .connect('mongodb+srv://kainy:kainy123@cluster0.osruv.mongodb.net/users?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
