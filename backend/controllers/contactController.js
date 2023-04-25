// aws
const { sendEmail } = require('../helpers/ses-helper');

const contact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if(!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const from = process.env.CONTACT_SENDER_EMAIL;
    const to = process.env.CONTACT_RECEIVER_EMAIL;
  
    const emailParams = {
      from: from,
      to: to,
      subject: subject,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    };
  
    try {
      await sendEmail(emailParams);
      return res.status(200).json({success: 'Email sent successfully!'})
    } catch (error) {
        return res.status(401).json({error: 'Unable to send email'})
    }
};

module.exports = {
    contact,
}