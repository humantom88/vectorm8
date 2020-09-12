const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_SECRET,
    },
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return(console.log(err));
        
    });
}

module.exports = mailer;