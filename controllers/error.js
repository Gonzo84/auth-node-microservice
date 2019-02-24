exports.errorHandler = (err, req, res, next) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({message: err});
    }
    let status;
    let message;
    switch (err.name) {
        case 'noTokenProvided':
            status = 401;
            message = 'No token provided';
            break;
        case 'noUserFound':
            status = 400;
            message = 'No user found';
            break;
        case 'invalidPassword':
            status = 400;
            message = 'Invalid password';
            break;
        case 'userAlreadyExists':
            status = 400;
            message = 'User already exists';
            break;
        default:
            status = 500;
            message = err.message;
    }
    // default to 500 server error
    return res.status(status).json({message: message});
};
