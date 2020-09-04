const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    pool: false,
    host: 'smtp.mail.ru',
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return(console.log(err));
        //console.log('email sent: ', info)
    });
}

module.exports = mailer;