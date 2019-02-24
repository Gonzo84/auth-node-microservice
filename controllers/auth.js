var User = require('../models/user');
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

var config = require('../config/config'); // get config file
const mailer = require('../util/sendMail');

exports.login = (req, res, next) => {

    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next({name: 'noUserFound'});
        }

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return next({name: 'invalidPassword'});
        }

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({
            id: user._id,
            role: user.role,
            authorized: user.authorized
        }, config.secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        // return the information including token as JSON
        res.status(200).send({auth: true, token: token});
    });
};

exports.register = (req, res, next) => {
    User.findOne({email: req.body.email}, onFindUserByEmail.bind(this, req, res, next));
};

function onFindUserByEmail(req, res, next, err, user) {
    if (user) {
        return next({name: 'userAlreadyExists'});
    } else {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: 'user',
                authorized: false
            },
            onUserRegister.bind(this, res, next)
        );
    }
}

function onUserRegister(res, next, err, user) {
    if (err) {
        return next(err);
    }
    // if user is registered without errors
    // create a token
    var token = jwt.sign({
        id: user._id,
        role: user.role,
        authorized: user.authorized
    }, config.secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    // mailer.sendMail(user.email); todo uncomment when inplement nodemailer transporter
    res.status(200).send({auth: true, token: token});
}