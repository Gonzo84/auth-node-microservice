var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config'); // get our config file

exports.verify = (req, res, next) => {
    if (req.originalUrl === '/register' ||req.originalUrl === '/login' ) {
        return next();
    }
    // check header or url parameters or post parameters for token
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (!token){
        return next({name: 'noTokenProvided'});
    }

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            next(err);
        }

        req.decoded = decoded;
        next();
    });
};