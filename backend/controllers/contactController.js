// aws
const { sendEmail } = require('../helpers/ses-helper');

const contact = async (req, res) => {
    const { name, email, subject, message } = contactForm;

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
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
};

module.exports = {
    contact,
}