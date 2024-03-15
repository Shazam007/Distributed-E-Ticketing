const express = require('express');
const {
    processPayment,
    refundPayment,
    verifyPayment
      } = require('../controllers/paymentController');

const router = express.Router();

router.post('/payment', processPayment);
router.get('/payment/:id/refund', refundPayment);

module.exports = {
    routes: router
}