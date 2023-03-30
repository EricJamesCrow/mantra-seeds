const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
    }
}, {
    timestamps: true
});

transactionSchema.statics.createTransaction = async (transactionId, paymentMethod, amount, status) => {
    try {
        const transaction = await Transaction.create({
            transactionId,
            paymentMethod,
            amount,
            status
        });
        return transaction;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const Transaction = mongoose.model('Transaction', transactionSchema);
  
module.exports = Transaction;