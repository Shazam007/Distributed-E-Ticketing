'use strict';
const db = require('../config/db');
const TicketOrder = require('../models/ticketOrder');
const dotenv = require('dotenv');
dotenv.config();

const createTicketOrder = async (req, res, next) => {
    try {
        const { userId, eventId, tickets, totalPrice, paymentId, status } = req.body;

        // Assuming orderId is generated or provided by the client
        const orderId = generateOrderId(); 

        const ticketOrder = new TicketOrder(orderId, userId, eventId, tickets, totalPrice, paymentId, status);
        const ordersCollection = await db.collection('TicketOrders');
        await ordersCollection.add(JSON.parse(JSON.stringify(ticketOrder)));
        
        res.status(201).send(orderId);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTicketOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const data = req.body;

        const orderRef = db.collection('TicketOrders').doc(orderId);
        await orderRef.update(data);

        res.status(200).send('Ticket order updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTicketOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        const order = await db.collection('TicketOrders').doc(orderId).get();

        if (!order.exists) {
            res.status(404).send('Ticket order with the given ID not found');
        } else {
            res.status(200).send(order.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUpdatedTicketOrderbyPaymentId = async (req, res, next) => {
    try {
        const paymentId = req.params.paymentId;
        console.log(paymentId);

        const orderCollection = await db.collection('TicketOrders');
        const orderQuery = await orderCollection
            .where('paymentId', '==', paymentId)
            .get();

        if (!orderQuery.empty) {
            const orderDoc = orderQuery.docs[0];

            // Update the status to "refunded"
            await orderDoc.ref.update({ 
                status: "refunded"
            });

            // Fetch the updated document
            const updatedOrderQuery = await orderDoc.ref.get();
            const updatedOrderData = updatedOrderQuery.data();

            // Send the updated order data back to the client
            res.status(200).send(updatedOrderData);
        } else {
            // If no orders found for the payment ID, send an error response
            throw new Error(`Orders not found for payment ${paymentId}`);
        }
    } catch (error) {
        // Send error response if any error occurs
        res.status(400).send(error.message);
    }
};


const deleteTicketOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        await db.collection('TicketOrders').doc(orderId).delete();

        res.status(200).send('Ticket order deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

function generateOrderId() {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = {
    createTicketOrder,
    updateTicketOrder,
    getTicketOrder,
    deleteTicketOrder,
    getUpdatedTicketOrderbyPaymentId
}

