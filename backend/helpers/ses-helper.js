const AWS = require('../config/aws-config');

const ses = new AWS.SES();

async function sendEmail({ from, to, subject, text, html }) {
    const params = {
        Source: from,
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: html,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: text,
                },
            },
        },
    };

    return ses.sendEmail(params).promise();
}

module.exports = {
    sendEmail,
};