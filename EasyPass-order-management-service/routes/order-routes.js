const express = require('express');
// const { authenticate } = require('../controllers/userController');
const {
    createTicketOrder,
    updateTicketOrder,
    getTicketOrder,
    deleteTicketOrder
      } = require('../controllers/orderController');

const router = express.Router();

router.post('/order', createTicketOrder);
router.put('/order/:id', updateTicketOrder);
router.get('/order/:id', getTicketOrder);
router.delete('/order/:id', deleteTicketOrder);

module.exports = {
    routes: router
}

// get all tickets for an event -> in event catalog service with event details