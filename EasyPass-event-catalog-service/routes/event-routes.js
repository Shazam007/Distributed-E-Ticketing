const express = require('express');
// const { authenticate } = require('../controllers/userController');
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents
      } = require('../controllers/eventController');

const router = express.Router();

router.post('/event', createEvent);
router.get('/events', getAllEvents);
router.get('/event/:id', getEvent);
router.put('/event/:id', updateEvent);
router.delete('/event/:id', deleteEvent);

module.exports = {
    routes: router
}