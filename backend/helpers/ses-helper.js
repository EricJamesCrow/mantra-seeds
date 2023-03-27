const AWS = require('../config/aws-config');

const ses = new AWS.SES();

async function sendEmail(emailParams) {
    const { from, to, subject, html} = emailParams;
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
            },
        },
    };

    return ses.sendEmail(params).promise();
}

module.exports = {
    sendEmail,
};