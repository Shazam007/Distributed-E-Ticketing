// Payment model
class Payment {
    constructor(
        userId,
        amount,
        currency,
        status,
        timestamp,
        transactionId
    ) {
        if (!userId || typeof userId !== 'string') {
            throw new Error('User ID is required and must be a string.');
        }
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number.');
        }
        if (typeof currency !== 'string' || currency.trim() === '') {
            throw new Error('Currency must be a non-empty string.');
        }
        if (typeof status !== 'string' || (status !== 'processed' && status !== 'refunded')) {
            throw new Error('Status must be either "processed" or "refunded".');
        }
        if (!timestamp || !(timestamp instanceof Date)) {
            throw new Error('Timestamp is required and must be a valid Date object.');
        }
        if (!transactionId || typeof transactionId !== 'string') {
            throw new Error('Transaction ID is required and must be a string.');
        }

        this.userId = userId;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.timestamp = timestamp;
        this.transactionId = transactionId;
    }
}

module.exports = Payment;