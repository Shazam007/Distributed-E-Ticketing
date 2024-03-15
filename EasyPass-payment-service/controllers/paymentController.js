'use strict';
const db = require('../config/db');
const Payment = require('../models/payment');
const dotenv = require('dotenv');
dotenv.config();

// Function to process payment
// payment part handled by the payment gateway from frontend
const processPayment = async (req, res, next) => {
    try {
        const paymentData = req.body;
        const payment = new Payment(
            paymentData.userId,
            paymentData.amount,
            paymentData.currency,
            'processed', // Assuming payment is successfully processed from frontend
            new Date(), // Current timestamp
            generateTransactionId() // Generate a unique transaction ID
        );

        const paymentsCollection = await db.collection('Payments');
        const paymentResponse = await paymentsCollection.add(JSON.parse(JSON.stringify(payment)));
        const paymentDoc = await paymentResponse.get();
        const data = paymentDoc.data();

        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Function to refund a payment
const refundPayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        const paymentRef = await db.collection('Payments').doc(paymentId);
        const refundData = {
            status: 'refunded',
            timestamp: new Date().toISOString() // Update timestamp to mark refund time
        };
        await paymentRef.update(refundData);

        res.send('Payment refunded successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Generate a unique transaction ID (placeholder implementation)
function generateTransactionId() {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = {
    processPayment,
    refundPayment
}