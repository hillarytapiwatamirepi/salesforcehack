// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/v1/endpoint', (req, res) => {
    res.json({ success: true });
});

////new methods ////
//import libraries needed for the webserver to work!
// library to connect to MongoDB

// const api = require('./api');
const user = require('./models/user.js');
const mongoConnectionURL =
    'mongodb+srv://salesforce:hackathon@cluster0.kiovc.mongodb.net/SalesforceProject?retryWrites=true&w=majority';
// TODO change database name to the name you chose
const databaseName = 'SalesforceProject';

// connect to mongodb
mongoose
    .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: databaseName
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// allow us to process POST requests
app.use(express.json());

// set up a session, which will persist login data across requests

// any server errors cause this function to run
app.use((err, req, res, next) => {
    //just preventing an error
    console.log(next);
    const status = err.status || 500;
    if (status === 500) {
        // 500 means Internal Server Error
        console.log('The server errored when processing a request!');
        console.log(err);
    }

    res.status(status);
    res.send({
        status: status,
        message: err.message
    });
});
//////////////////////////////

app.listen(PORT, () =>
    // console.log("Im here")
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);

module.exports = { file: 'candy' };
