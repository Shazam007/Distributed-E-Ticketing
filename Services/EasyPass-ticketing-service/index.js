'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swagger = require('./config/swagger');
const TicketingRoutes = require('./routes/ticketing-routes');

dotenv.config();
const {PORT,HOST} = process.env

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

swagger(app)

app.use('/api', TicketingRoutes.routes);

app.listen(PORT, () => console.log('App is listening on url http://'+HOST+':' + PORT));
module.exports = {app}