const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'krsticmarkokg@gmail.com',
        pass: 'gonzolina1962'
    }
});
exports.sendMail = (email) => {
    var mailOptions = {
        from: 'testerko@gmail.com',
        to: 'krsticm@ymail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};