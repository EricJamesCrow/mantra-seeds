const RecipientList = require('../models/recipientListModel')
const mongoose = require('mongoose')

const addToNewsletter = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the Newsletter RecipientList
        const newsletter = await RecipientList.findOne({ name: 'newsletter' })

        // If newsletter list doesn't exist yet, create it.
        if (!newsletter) {
            const newNewsletter = new RecipientList({ name: 'newsletter' });
            await newNewsletter.save();
        }

        // Check if the email already exists in the recipients list
        const existingRecipient = newsletter.recipients.find(recipient => recipient.email === email);

        // If email exists and has not unsubscribed, return an error message
        if (existingRecipient && !existingRecipient.unsubscribed) {
            return res.status(400).json({ message: 'This email is already in the newsletter.' });
        }

        // If email exists and has unsubscribed, update the unsubscribed status
        if (existingRecipient && existingRecipient.unsubscribed) {
            existingRecipient.unsubscribed = false;
        }
        // If email doesn't exist, add it to the recipient list
        else {
            newsletter.recipients.push({ email });
        }

        // Save the updated newsletter document
        await newsletter.save();

        res.status(200).json({ success: `${email} added to the newsletter!` })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
};

module.exports = {
    addToNewsletter
}
