const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const logger = require('../middleware/logger');

module.exports = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use([logger]);
    app.use(express.static("public")); //commentare se si vuole usare routes
}