'use strict';
const db = require('../config/db');
const Event = require('../models/event');
const Ticket = require('../models/ticket');
const dotenv = require('dotenv');
dotenv.config();

// this function is already in the event catalog service

// const maintainTicketInventory = async (req, res, next) => {
//     try {
//         const eventData = req.body;

//         const event = new Event(
//             eventData.eventName,
//             eventData.description,
//             new Date(eventData.startDate),
//             new Date(eventData.endDate),
//             eventData.location,
//             eventData.organizer,
//             eventData.capacity
//         );

//         const eventsCollection = await db.collection('Events');
//         const eventResponse = await eventsCollection.add(JSON.parse(JSON.stringify(event)));

//         const eventDoc = await eventResponse.get();
//         const data = eventDoc.data();
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// single event has tickets with different types and quantities

// check if there are tickets available for the event
// request -> /api/ticketing/checkTicketAvailability/:eventId
// {
//     "availableTickets": 80,
//     "ticketCounts": {
//         "General Admission": {
//             "totalTickets": 100,
//             "reservedTickets": 20
//         },
//         "VIP": {
//             "totalTickets": 50,
//             "reservedTickets": 10
//         }
//     }
// }
const getTicketAvailability = async (req, res, next) => {
    try {
        const eventId = req.params.id;

        const event = await db.collection('Events').doc(eventId).get();

        if (!event.exists) {
            res.status(404).send('Event with the given ID not found');
        } else {
            const eventData = event.data();
            console.log(eventData)
            const soldTicketsCount = await getSoldTicketsCount(eventId);
            // const availableTickets = eventData.capacity - soldTicketsCount;

            const ticketsCollection = await db.collection('Tickets');
            const ticketQuery = await ticketsCollection
                .where('eventId', '==', eventId)
                .get();

            let ticketCounts = {};

            ticketQuery.forEach(ticketDoc => {
                const ticket = ticketDoc.data();
                const ticketType = ticket.type;

                if (!ticketCounts[ticketType]) {
                    ticketCounts[ticketType] = {
                        totalTickets: 0,
                        reservedTickets: 0,
                        availableTickets: 0
                    };
                }

                ticketCounts[ticketType].totalTickets += ticket.quantity || 0;
                ticketCounts[ticketType].reservedTickets += ticket.reservedQuantity || 0;
                ticketCounts[ticketType].availableTickets = ticketCounts[ticketType].totalTickets - ticketCounts[ticketType].reservedTickets || 0;
            });

            res.status(200).send({ ticketCounts });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getSoldTicketsCount(eventId) {
    const ticketsCollection = await db.collection('Tickets');
    const ticketQuery = await ticketsCollection
        .where('eventId', '==', eventId)
        .get();

    let soldTicketsCount = 0;

    ticketQuery.forEach(ticketDoc => {
        const ticket = ticketDoc.data();
        soldTicketsCount += (ticket.quantity || 0);
    });

    return soldTicketsCount;
}

// add tickets to the inventory for the event
// request -> /api/ticketing/addTicketsToInventory/:eventId
// {
//     "tickets": [
//         {
//             "type": "General Admission",
//             "price": 20,
//             "quantity": 50
//         },
//         {
//             "type": "VIP",
//             "price": 50,
//             "quantity": 30
//         }
//     ]
// }
// response -> 'Tickets added to inventory successfully'
const addTicketsToInventory = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const ticketsData = req.body.tickets;

        const tickets = ticketsData.map(ticketData => new Ticket(
            eventId,
            ticketData.type,
            ticketData.price,
            ticketData.quantity
        ));

        const ticketsCollection = await db.collection('Tickets');
        const batch = db.batch();

        tickets.forEach(ticket => {
            const ticketRef = ticketsCollection.doc();
            batch.set(ticketRef, JSON.parse(JSON.stringify(ticket)));
        });

        await batch.commit();
        res.status(200).send('Tickets added to inventory successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// issue tickets for a event
// request -> /api/ticketing/issueTickets/:eventId
// {
//     "tickets": [
//         {
//             "type": "General Admission",
//             "quantity": 2
//         },
//         {
//             "type": "VIP",
//             "quantity": 1
//         }
//     ]
// }
// response -> 'Tickets issued successfully'
const issueTickets = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const ticketsData = req.body;

        const ticketsCollection = await db.collection('Tickets');

        ticketsData.forEach(async ticketData => {
            const ticketQuery = await ticketsCollection
                .where('eventId', '==', eventId)
                .where('type', '==', ticketData.type)
                .get();

            if (!ticketQuery.empty) {
                const ticketDoc = ticketQuery.docs[0];
                const ticket = ticketDoc.data();

                if (ticket.quantity >= ticketData.quantity) {
                    await ticketDoc.ref.update({ quantity: ticket.quantity - ticketData.quantity });
                } else {
                    throw new Error(`Insufficient tickets available for ${ticketData.type}`);
                }
            } else {
                throw new Error(`Ticket type ${ticketData.type} not found for event ${eventId}`);
            }
        });

        res.status(200).send('Tickets issued successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// following two need to implement in the catalog service. only the ticket inventory is maintained here
// request : event id + {
//     "type": "General Admission",
//     "price": 25
// }
const updateTicketInventory = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const data = req.body;

        const ticketsCollection = await db.collection('Tickets');
        const ticketQuery = await ticketsCollection
            .where('eventId', '==', eventId)
            .get();

        const batch = db.batch();

        ticketQuery.forEach(ticketDoc => {
            const ticketRef = ticketDoc.ref;
            batch.update(ticketRef, data);
        });

        await batch.commit();

        res.status(200).send('Ticket inventory updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function deleteEventTickets(eventId) {
    const ticketsCollection = await db.collection('Tickets');
    const ticketQuery = await ticketsCollection
        .where('eventId', '==', eventId)
        .get();

    const batch = db.batch();

    ticketQuery.forEach(ticketDoc => {
        batch.delete(ticketDoc.ref);
    });

    await batch.commit();
}

module.exports = {
    getTicketAvailability,
    addTicketsToInventory,
    issueTickets,
    updateTicketInventory,
    deleteEventTickets
}