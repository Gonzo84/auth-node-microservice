const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbUri = require('./util/db').dbUri;
const User = require('./models/user');
const app = express();

const authRoutes = require('./routes/auth');
const errorHandler = require('./controllers/error');
const verifyToken = require('./controllers/verifyToken');

app.use(bodyParser.urlencoded({extended: false}));

app.use(verifyToken.verify);

app.use(authRoutes);

app.use(errorHandler.errorHandler);

mongoose.connect(dbUri, {useNewUrlParser: true})
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Joca',
                    email: 'joca@joca.com',
                    password: 'password',
                    role: 'admin',
                    authorized: true
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
