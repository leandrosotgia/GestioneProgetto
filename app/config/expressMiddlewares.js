const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const logger = require('../middleware/logger');

module.exports = (app) => {

    // SESSION? -> auth?
    
    app.use(express.urlencoded({ extended: true }));
    // app.use(session({
    //         secret: "secret key", 
    //         resave: true, 
    //         saveUninitialized: true}));
    app.use(cors());
    app.use(cookieParser());
    app.use([logger]);
    app.use(express.static("public")); //commentare se si vuole usare routes
}