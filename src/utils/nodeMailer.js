const nodemailer = require('nodemailer');

const Mailer = async () => {

    try {
        var transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tirth.patel6521@gmail.com',
                pass: 'ftic xesq dhyv mmrl'
            },
            tls: {
                rejectUnauthorized: false
              }
        });

        var mailOptions = {
            from: 'tirth.patel6521@gmail.com',
            to: 'falduharsh1@gmail.com',
            subject: 'test mail',
            text: 'That was easy! you are nob'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log("error", error);

    }

}
module.exports = Mailer