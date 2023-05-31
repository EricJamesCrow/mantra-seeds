const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

async function sendEmail(emailParams) {
    const { from, to, subject, html} = emailParams;

    const data = {
        from: from,
        to: [to],
        subject: subject,
        text: html,
        html: html,
    };

    try {
        let response = await mg.messages.create('mail.mantra-seeds.com', data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    sendEmail,
};
