require("dotenv").config();

const express = require("express");
const HTTPS = require("https");
const fs = require("fs");
const app = express();

require('./config/expressMiddlewares')(app);
require('./config/database.js')(app)


const HTTPSCredentials = require('./config/HTTPSCredentials');


const port = process.env.PORT || 8080;
const address = process.env.ADDRESS || "127.0.0.1";

let httpsServer = HTTPS.createServer(HTTPSCredentials.Get(), app);
httpsServer.listen(port, address, function () {
    console.log(`[${new Date().toLocaleTimeString()} INFO]: [SERVER] Server is online on port: %s...`, port);
});

