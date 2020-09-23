module.exports.sendMsg = (mailSended, res) => {
    const token = process.env.TELEGRAM_TOKEN;
    const chat = process.env.TELEGRAM_CHAT;
    let http = require('request');
    let fields = [
        `Сообщение от: ${mailSended.name}`,
        `Email: ${mailSended.email}`,
        `Телефон: ${mailSended.phone}`,
        mailSended.message
    ];
    let msg = '';
    fields.forEach(field => {
        msg += field + '\n'
    });
    msg = encodeURI(msg);
    http.post(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat}&parse_mode=html&text=${msg}`,
        function (error, response, body) {
            console.log('error: ', error);
            //console.log('statusCode:', response && response.statusCode); 
            //console.log('body:', body);
            if(response.statusCode === 200){
                //res.status(200).json({status: 'ok', message: 'Сообщение отправлено'});
              }
              if(response.statusCode === 400){
                res.status(400).json({status: 'error', message: 'Произошла ошибка'});
              }
    });
}