const express = require('express');
// const { authenticate } = require('../controllers/userController');
const {
    getTicketAvailability,
    addTicketsToInventory,
    issueTickets,
    updateTicketInventory,
    deleteEventTickets,
    updateTicketAvailability
      } = require('../controllers/ticketingController');

const router = express.Router();

router.get('/tickets/:id', getTicketAvailability);
router.post('/tickets/:id', addTicketsToInventory);
router.post('/tickets/reserve/:id', issueTickets);
router.put('/tickets/:id', updateTicketInventory);
router.delete('/tickets/:id', deleteEventTickets);
router.put('/tickets/:eventId/updateAvailability', updateTicketAvailability);

module.exports = {
    routes: router
}

// get all tickets for an event -> in event catalog service with event details