const express = require('express');
// const { authenticate } = require('../controllers/userController');
const {
    processPayment,
    refundPayment,
    verifyPayment
      } = require('../controllers/paymentController');

const router = express.Router();

router.post('/payment', processPayment);
router.get('/payment/:id/refund', refundPayment);
router.get('/payment/:id', verifyPayment);

module.exports = {
    routes: router
}