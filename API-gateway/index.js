'use strict';
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { authMiddleware } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const SERVICES = {
    userService: process.env.USER_SERVICE_BASE_URL,
    ticketingService: process.env.TICKETING_SERVICE_BASE_URL,
    eventService: process.env.EVENT_SERVICE_BASE_URL,
    paymentService: process.env.PAYMENT_SERVICE_BASE_URL,
};

app.use(authMiddleware);
// Generic request handler
const handleRequest = async (serviceUrl, path, method, req, res) => {
    try {
        const url = `${serviceUrl}${path}`;
        const { data } = await axios({
            method: method,
            url,
            data: req.body,
            headers: {
                'content-type': 'application/json',
                'authorization': req.headers.authorization
            },
        });
        res.status(200).send(data);

    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            res.status(status).json(data);
        } else {
            res.status(500).send('Service unavailable');
        }
    }
};

app.post('/purchaseTicket', async (req, res) => {
    // Step 1: Reserve tickets
    const response = await handleRequest(SERVICES.ticketingService, `/api/tickets/${req.body.eventId}`, 'get', req, res);
    console.log(res.data)
    if (!res.success) {
        return res.status(500).json(res.error);
    }
    console.log(res.data.ticketCounts[req.body.type].availableTickets)
    if (res.ticketCounts[req.body.type].availableTickets >= req.body.quantity){
        console.log("ticket count reserved")
    }


});

// User service routes
app.post('/login', (req, res) => handleRequest(SERVICES.userService, '/api/user/login', req, res));
app.post('/register', (req, res) => handleRequest(SERVICES.userService, '/api/user/register', req, res));

// // Event Catalog (Get) route
// app.get('/event/:eventId', async (req, res) => {
//     const eventDetails = await handleRequest(SERVICES.eventService, `/api/events/${req.params.eventId}`, 'get', null, req.headers);
//     if (!eventDetails.success) {
//         return res.status(500).json(eventDetails.error);
//     }
//     res.json(eventDetails.data);
// });

// // Ticketing (Get) route for available tickets
// app.get('/tickets/available/:eventId', async (req, res) => {
//     const availableTickets = await handleRequest(SERVICES.ticketingService, `/api/tickets/available/${req.params.eventId}`, 'get', null, req.headers);
//     if (!availableTickets.success) {
//         return res.status(500).json(availableTickets.error);
//     }
//     res.json(availableTickets.data);
// });

// Complete order route (combining Ticketing POST, Payment POST, and Order Management POST)


    // const reservedTickets = await handleRequest(SERVICES.ticketingService, `/api/tickets/reserve`, 'post', req.body, req.headers);
    // if (!reservedTickets.success) {
    //     return res.status(500).json(reservedTickets.error);
    // }
    
    // // Step 2: Process payment
    // const paymentProcessed = await handleRequest(SERVICES.paymentService, `/api/payment/process`, 'post', req.body, req.headers);
    // if (!paymentProcessed.success) {
    //     return res.status(500).json(paymentProcessed.error);
    // }

    // // Step 3: Log order
    // const orderLogged = await handleRequest(SERVICES.orderManagementService, `/api/orders/log`, 'post', req.body, req.headers);
    // if (!orderLogged.success) {
    //     return res.status(500).json(orderLogged.error);
    // }

    // // Send response with order number
    // res.json({ message: 'Order completed successfully', orderNumber: orderLogged.data.orderNumber });


// app.get('/events', (req, res) => handleRequest(SERVICES.eventService, '/api/events', req, res));

// app.post('/purchase', authMiddleware, (req, res) => {
//     var id = req.body.id
//     app.get('/events', (req, res) => handleRequest(SERVICES.eventService, '/api/tickets'+id, req, res));
//     res.
//     // handleRequest(SERVICES.eventService, '/api/event/:id', req, res);
// });

// // Event service routes

// app.get('/event/:id', (req, res) => handleRequest(SERVICES.eventService, '/api/event/:id', req, res));


// // Ticketing service routes
// app.use('/api/ticketing', (req, res) => handleRequest(SERVICES.ticketingService, req.path, req, res));


// // Payment service routes
// app.use('/api/payments', (req, res) => handleRequest(SERVICES.paymentService, req.path, req, res));

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
