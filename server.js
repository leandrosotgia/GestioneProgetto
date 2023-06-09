require("dotenv").config();

const express = require("express");
const HTTPS = require("https");
const bcrypt = require('bcrypt');
const fs = require("fs");
const app = express();
const utils = require('./config/utils');

require('./config/expressMiddlewares')(app);
const db = require('./config/database.js');

// db.getAllUtenti(function(results, errQuery){
//     console.log(results);
// });

const HTTPSCredentials = require('./config/HTTPSCredentials');
const tokenAdministration = require("./config/tokenAdministration");


console.log(bcrypt.hashSync('banana123', 12));


const port = process.env.PORT || 8080;
const address = process.env.ADDRESS || "127.0.0.1";

let httpsServer = HTTPS.createServer(HTTPSCredentials.Get(), app);
httpsServer.listen(port, address, function () {
    console.log(`[${new Date().toLocaleTimeString()} INFO]: [SERVER] Server is online on port: %s...`, port);
});

app.post('/api/register', function (req, res) {

    let pwd = utils.generatePassword(12);
    let phantomPwd = bcrypt.hashSync(pwd, 12)

    console.log(pwd, phantomPwd);

    let query = { nome: req.body.nome, cognome: req.body.cognome, email: req.body.email, password: phantomPwd }
    db.insertUtente(query, function (results, errQuery) {
        console.log(results, errQuery);
        if (errQuery.codeErr === 200) {
            console.log("Register OK");
            // createtoken


            tokenAdministration.createToken(query);
            res.send({ msg: "Register OK", token: tokenAdministration.token, email: query.email, nome: query.nome, cognome: query.cognome });
        }
        error(req, res, { codeErr: errQuery.codeErr, message: errQuery.message });
    });
});

app.post('/api/login', function (req, res) {
    let query = { email: req.body.email, password: req.body.password };
    db.findLogin(query, function (results, errQuery) {
        console.log(results, errQuery);
        if (errQuery.codeErr === 200) {
            console.log("LOGIN OK");
            tokenAdministration.createToken(results[0]);
            console.log(tokenAdministration.token);
            res.send({ msg: "Login OK", token: tokenAdministration.token, email: query.email, nome: query.nome, cognome: query.cognome });
        }
        else
            error(req, res, { codeErr: errQuery.codeErr, message: errQuery.message });
    });
});

app.get('/api/checkToken', function (req, res) {
    tokenAdministration.ctrlTokenLocalStorage(req, function (payload) {
        if (!payload.err_exp) {
            res.send({ msg: "Token OK, Init pagina", data: {} });
        } else {
            console.log(payload.message);
            error(req, res, { codeErr: 403, message: payload.message });
        }
    });
});


app.get('/api/getUtenti', function(req, res){
    tokenAdministration.ctrlTokenLocalStorage(req, function (payload) {
        if (!payload.err_exp) {

            let query = { email: payload.email };
            db.checkAdmin(query, function (results, errQuery) {

                if (errQuery.codeErr === 200) {
                    console.log(results, errQuery);
                    console.log("ADMIN OK");

                    db.getAllUtenti(function(results, fields, errQuery){
                        console.log(results);
                        if(errQuery.codeErr === 200){
                            res.send({msg: 'Dati Utenti OK', fields: fields, results: results });
                        }
                        else
                            error(req, res, { codeErr: errQuery.codeErr, message: errQuery.message });
                    });
                }
                else
                    error(req, res, { codeErr: errQuery.codeErr, message: errQuery.message });
            });
        } else {
            console.log(payload.message);
            error(req, res, { codeErr: 403, message: payload.message });
        }
    });
})

app.post('/api/checkAdmin', function (req, res) {
    tokenAdministration.ctrlTokenLocalStorage(req, function (payload) {
        if (!payload.err_exp) {

            console.log(payload);

            let query = { email: payload.email };
            db.checkAdmin(query, function (results, errQuery) {

                if (errQuery.codeErr === 200) {
                    console.log(results, errQuery);
                    console.log("ADMIN OK");
                    res.send({ msg: 'Admin OK', results: results[0].IS_Admin});
                }
                else
                    error(req, res, { codeErr: errQuery.codeErr, message: errQuery.message });
            });
        } else {
            console.log(payload.message);
            error(req, res, { codeErr: 403, message: payload.message });
        }
    });
})

function error(req, res, err) {
    try {
        res.status(err.codeErr).send(err.message);
    }
    catch (ex) { }
}