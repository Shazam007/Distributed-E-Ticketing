'use strict';
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const SERVICES = {
    userService: process.env.USER_SERVICE_BASE_URL,
    ticketingService: process.env.TICKETING_SERVICE_BASE_URL,
    eventService: process.env.EVENT_SERVICE_BASE_URL,
    paymentService: process.env.PAYMENT_SERVICE_BASE_URL,
};

// Generic request handler
const handleRequest = async (serviceUrl, path, req, res) => {
    try {
        const url = `${serviceUrl}${path}`;
        const { data } = await axios({
            method: req.method,
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

// User service routes
app.post('/login', (req, res) => handleRequest(SERVICES.userService, '/api/user/login', req, res));

app.post('/register', (req, res) => handleRequest(SERVICES.userService, '/api/user/register', req, res));

  
// Ticketing service routes
app.use('/api/ticketing', (req, res) => handleRequest(SERVICES.ticketingService, req.path, req, res));

// Event service routes
app.use('/api/events', (req, res) => handleRequest(SERVICES.eventService, req.path, req, res));

// Payment service routes
app.use('/api/payments', (req, res) => handleRequest(SERVICES.paymentService, req.path, req, res));

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
