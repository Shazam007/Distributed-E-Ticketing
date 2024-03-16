'use strict';
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const { authMiddleware } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors);
app.use(express.json());

const SERVICES = {
    userService: process.env.USER_SERVICE_BASE_URL,
    ticketingService: process.env.TICKETING_SERVICE_BASE_URL,
    eventService: process.env.EVENT_SERVICE_BASE_URL,
    paymentService: process.env.PAYMENT_SERVICE_BASE_URL,
    orderManagmentService: process.env.OREDER_MANAGEMENT_SERVICE_BASE_URL,
};

app.use(authMiddleware);
// Generic request handler
const handleRequest = async (serviceUrl, path, method, req, data) => {
    try {
        const url = `${serviceUrl}${path}`;

        const response = await axios({
            method: method,
            url,
            data: data,
            headers: {
                'content-type': 'application/json',
                'authorization': req.headers.authorization
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return { status, error: data };
        } else {
            return { status: 500, error: 'Service unavailable' };
        }
    }
};

// Method to handle ticket reservation
async function reserveTickets(req, res, eventId) {
    const reservationResponse = await handleRequest(SERVICES.ticketingService, `/api/tickets/reserve/${eventId}`, req.method, req, req.body.tickets);

    if (reservationResponse.error) {
        return res.status(reservationResponse.status).json(reservationResponse.error);
    }

    return reservationResponse;
}

// Method to handle payment processing
async function processPayment(req, res) {
    req.body.paymentInfo.userId = req.user.id;
    console.log(req.body.paymentInfo);
    const paymentResponse = await handleRequest(SERVICES.paymentService, `/api/payment`, req.method, req, req.body.paymentInfo);

    if (paymentResponse.error) {
        return res.status(paymentResponse.status).json(paymentResponse.error);
    }

    req.body.paymentId = paymentResponse.transactionId;
    req.body.userId = paymentResponse.userId;
    req.body.totalPrice = paymentResponse.amount;
    req.body.status = paymentResponse.status;

    return paymentResponse;
}

// Method to handle order management
async function manageOrder(req, res) {
    console.log(req.body);
    const orderResponse = await handleRequest(SERVICES.orderManagmentService, `/api/order`, req.method, req, req.body);

    if (orderResponse.error) {
        return res.status(orderResponse.status).json(orderResponse.error);
    }

    return orderResponse;
}

// Main route handler
app.post('/purchaseTicket', async (req, res) => {
    try {
        const ticketResponse = await handleRequest(SERVICES.ticketingService, `/api/tickets/${req.body.eventId}`, 'get', req, req.body);

        if (ticketResponse.error) {
            return res.status(ticketResponse.status).json(ticketResponse.error);
        }

        if (!ticketResponse.ticketCounts) {
            return res.status(500).json({ error: "Unexpected response format" });
        }

        const insufficientTicketTypes = [];

        req.body.tickets.forEach(ticket => {
            const type = ticket.type;
            const requestedQuantity = ticket.quantity;
            const availableTickets = ticketResponse.ticketCounts[type].availableTickets;
            if (availableTickets < requestedQuantity) {
                insufficientTicketTypes.push(type);
            }
        });

        if (insufficientTicketTypes.length > 0) {
            return res.status(422).json({ error: `Insufficient tickets available for ${insufficientTicketTypes.join(", ")}.` });
        }

        await reserveTickets(req, res, req.body.eventId);
        
        await processPayment(req, res);

        const orderResponse = await manageOrder(req, res);

        res.status(200).send(orderResponse);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/refundPayment', async (req, res) => {
    try {
        //only admin can perform this
        const isAdmin = await isAdminUser(req, res);
        if (isAdmin) {
            // update status in payment -> refunded
            const refundPaymentResponse = await handleRequest(SERVICES.paymentService, `/api/payment/${req.body.paymentId}/refund`, 'get', req, req.body);
            if (refundPaymentResponse.error) {
                return res.status(refundPaymentResponse.status).json(refundPaymentResponse.error);
            }
            // Capture tickets allocated with the refunded order
            const orderResponse = await orderDetaisByPymentID(req, res);
            // Increase available ticket count based on that
            const ticketResp = await updateTicketAvailability(req, res);
            // Send refunded payment id
            res.status(200).send({ refundPaymentResponse, orderResponse,ticketResp });
        } else {
            return res.status(403).send("Only admins can refund payments"); 
        }
    } catch (error) {
        // Handle errors without sending a response here
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Method to get order details by payment
async function orderDetaisByPymentID(req, res) {
    console.log(req.body.paymentId)
    const orderResponse = await handleRequest(SERVICES.orderManagmentService, `/api/order/updatedOrder/${req.body.paymentId}`, req.method, req, req.body);

    if (orderResponse.error) {
       res.status(orderResponse.status).json(orderResponse.error);
    }

    req.body.eventId = orderResponse.eventId;
    req.body.tickets = orderResponse.tickets;
    console.log(orderResponse.eventId)
    return orderResponse;
}

// Method to update ticket quatities
async function updateTicketAvailability(req, res) {
    const ticketResp = await handleRequest(SERVICES.ticketingService, `/api/tickets/${req.body.eventId}/updateAvailability`, 'put', req, req.body);

    if (ticketResp.error) {
        return res.status(ticketResp.status).json(ticketResp.error);
    }

    return ticketResp;
}


// User service routes
app.post('/login', async (req, res) =>{
    try{
        const loginResponse = await handleRequest(SERVICES.userService, '/api/user/login','post', req, req.body);
        if (loginResponse.error) {
            return res.status(loginResponse.status).json(loginResponse.error);
        }
        return res.status(200).send(loginResponse);
    } catch (error) {
        // Handle any errors that occur during the login process
        return res.status(500).json({ error: error.message });
    }
});

app.post('/register', async (req, res) => {
    try {
        const registeredRes = await handleRequest(SERVICES.userService, '/api/user/register', req.method, req, req.body);
        if (registeredRes.error) {
            return res.status(registeredRes.status).json(registeredRes.error);
        }
        return res.status(200).send(registeredRes); 
    } catch (error) {
        // Handle any errors that occur during the registration process
        return res.status(500).json({ error: error.message });
    }
});

app.get('/viewEvents', async (req, res) => {
    try {
        const eventsResponse = await handleRequest(SERVICES.eventService, '/api/events', req.method , req, req.body);
        if (eventsResponse.error) {
            return res.status(eventsResponse.status).json(eventsResponse.error);
        }
        return res.status(200).send(eventsResponse); 
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

// Method to handle order management
async function isAdminUser(req, res) {
    const userResp = await handleRequest(SERVICES.userService, `/api/user/${req.user.id}`, 'get', req, req.body);

    if (userResp.error) {
        return res.status(userResp.status).json(userResp.error);
    }

    if(userResp.role == "admin"){
        return true;
    }
    return false;
}

app.post('/addEvent', async (req, res) => {
    try {
        const isAdmin = await isAdminUser(req, res);

        if(isAdmin){
            const eventsResponse = await handleRequest(SERVICES.eventService, '/api/event', req.method , req, req.body);
            if (eventsResponse.error) {
                return res.status(eventsResponse.status).json(eventsResponse.error);
            }
            return res.status(200).send(eventsResponse); 
        }else{
            return res.status(403).send("only admins can add events"); 
        }
        
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

app.put('/updateEvent', async (req, res) => {
    try {
        const isAdmin = await isAdminUser(req, res);

        if(isAdmin){
            const eventsResponse = await handleRequest(SERVICES.eventService, `/api/event/${req.body.id}`, req.method , req, req.body);
            if (eventsResponse.error) {
                return res.status(eventsResponse.status).json(eventsResponse.error);
            }
            return res.status(200).send(eventsResponse); 
        }else{
            return res.status(403).send("only admins can update events"); 
        }
        
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

app.delete('/deleteEvent', async (req, res) => {
    try {
        const isAdmin = await isAdminUser(req, res);

        if(isAdmin){
            const eventsResponse = await handleRequest(SERVICES.eventService, `/api/event/${req.body.id}`, req.method , req, req.body);
            if (eventsResponse.error) {
                return res.status(eventsResponse.status).json(eventsResponse.error);
            }
            return res.status(200).send(eventsResponse); 
        }else{
            return res.status(403).send("only admins can delete events"); 
        }
        
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

app.post('/addTicketsToEvent', async (req, res) => {
    try {
        const isAdmin = await isAdminUser(req, res);

        if(isAdmin){
            const ticketingServiceResp = await handleRequest(SERVICES.ticketingService, `/api/tickets/${req.body.eventId}`, req.method , req, req.body);
            if (ticketingServiceResp.error) {
                return res.status(ticketingServiceResp.status).json(ticketingServiceResp.error);
            }
            return res.status(200).send(ticketingServiceResp); 
        }else{
            return res.status(403).send("only admins can add events"); 
        }
        
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

app.put('/updateTickets', async (req, res) => {
    try {
        const isAdmin = await isAdminUser(req, res);

        if(isAdmin){
            const ticketingServiceResp = await handleRequest(SERVICES.ticketingService, `/api/tickets/${req.body.eventId}`, req.method , req, req.body);
            if (ticketingServiceResp.error) {
                return res.status(ticketingServiceResp.status).json(ticketingServiceResp.error);
            }
            return res.status(200).send(ticketingServiceResp); 
        }else{
            return res.status(403).send("only admins can add events"); 
        }
        
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

app.delete('/deleteTickets', async (req, res) => {
    try {
        const isAdmin = await isAdminUser(req, res);

        if(isAdmin){
            const ticketingServiceResp = await handleRequest(SERVICES.ticketingService, `/api/tickets/${req.body.eventId}`, req.method , req, req.body);
            if (ticketingServiceResp.error) {
                return res.status(ticketingServiceResp.status).json(ticketingServiceResp.error);
            }
            return res.status(200).send(ticketingServiceResp); 
        }else{
            return res.status(403).send("only admins can add events"); 
        }
        
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

app.get('/ticketsAvailability', async (req, res) => {
    try {
        const ticketResponse = await handleRequest(SERVICES.ticketingService, `/api/tickets/${req.body.eventId}`, req.method , req, req.body);
        if (ticketResponse.error) {
            return res.status(ticketResponse.status).json(ticketResponse.error);
        }
        return res.status(200).send(ticketResponse); 
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});

module.exports = {app}