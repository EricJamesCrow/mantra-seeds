const postmark = require("postmark");

let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

async function sendEmail(emailParams) {
    const { from, to, subject, html} = emailParams;

    const data = {
        From: from,
        To: to,
        Subject: subject,
        TextBody: html,
        HtmlBody: html,
    };

    try {
        let response = await client.sendEmail(data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    sendEmail,
};
