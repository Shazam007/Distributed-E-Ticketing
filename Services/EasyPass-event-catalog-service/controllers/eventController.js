'use strict';
const db = require('../config/db');
const Event = require('../models/event');
// const redis = require('redis');
const { promisify } = require('util');
const dotenv = require('dotenv');
dotenv.config();

// Create Redis client
// const client = redis.createClient();

// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);

const createEvent = async (req, res, next) => {
    try {
        console.log("test")
        const eventData = req.body;
        const event = new Event(
            eventData.eventName,
            eventData.description,
            eventData.startDate,
            eventData.endDate,
            eventData.location,
            eventData.organizer,
            eventData.eventType,
            eventData.organizerName,
            eventData.postedDate,
        );

        const eventsCollection = await db.collection('Events');
        const eventResponse = await eventsCollection.add(JSON.parse(JSON.stringify(event)));
        const eventId = eventResponse.id;

        // await setAsync(eventId, JSON.stringify(eventData)); // Cache event data in Redis

        res.status(200).send({ id: eventId });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const eventsCollection = await db.collection('Events').doc(id);
        await eventsCollection.update(data);

        await setAsync(id, JSON.stringify(data)); // Update cached event data in Redis

        res.send('Event record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const id = req.params.id;

        await db.collection('Events').doc(id).delete();

        // await client.del(id); // Delete cached event data in Redis

        res.send('Event record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getEvent = async (req, res, next) => {
    try {
        const id = req.params.id;

        let eventData = await getAsync(id); // Check cache first
        if (!eventData) {
            const event = await db.collection('Events').doc(id).get();
            if (!event.exists) {
                res.status(404).send('Event with the given ID not found');
                return;
            }
            eventData = JSON.stringify(event.data());
            await setAsync(id, eventData); // Cache the event data
        }

        res.send(JSON.parse(eventData));
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllEvents = async (req, res, next) => {
    try {
        const eventsCollection = await db.collection('Events');
        const eventsSnapshot = await eventsCollection.get();

        const eventsArray = [];
        eventsSnapshot.forEach(event => {
            eventsArray.push(event.data());
        });

        res.send(eventsArray);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getAllEvents,
};