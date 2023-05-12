"use strict";

const mysql = require('mysql');
const bcrypt = require('bcrypt');
require("dotenv").config();



function createConnection(callback = () => { }) {
  let conn = null;
  let err = { codeErr: 200, message: "" }
  try {
    conn = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PWD,
      database: process.env.DATABASE_NAME,
    });
    callback(conn, err);
  }
  catch (ex) {
    let err = { codeErr: 503, message: "Errore di connessione al database MySQL" };
    callback(conn, err);
  }
}
let DB = function () { }


// TEST CONNESSIONE
createConnection(function (conn, err) {
  if (err.codeErr === 200) {
    conn.connect();
    let errQuery = { codeErr: 200, message: "" }
    conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) {
        console.log(error);
        errQuery = { codeErr: 500, message: "Errore duranze l'esecuzione della query" };
        return; // callback(errQuery)
      }
      console.log(`[${new Date().toLocaleTimeString()} INFO]: [SERVER] Database is online`);
    });
  }
});

// ` = ALT + 96

DB.prototype.getAllUtenti = function (callback = () => { }) {
  createConnection(function (conn, err) {
    if (err.codeErr === 200) {
      let errQuery = { codeErr: 200, message: "" }
      conn.query(`SELECT Utenti.Nome, Utenti.Cognome, Utenti.Email, Utenti.Pwd, Utenti.IS_Admin FROM Utenti`, function (error, results, fields) {
        if (error) {
          console.log(error);
          errQuery = { codeErr: 500, message: "Errore duranze l'esecuzione della query" };
          callback(results, fields, errQuery);
        }
        callback(results, fields, errQuery);
        // fields.forEach(function (element) {
        //   console.log(element.name);
        // });
        conn.end();
      });
    }
    else {
      callback(null, null, err);
    }
  });
}


// BEGIN TRY
//     BEGIN TRANSACTION;

//     IF NOT EXISTS (SELECT id FROM utenti WHERE email = 'nuovo_indirizzo_email')
//     BEGIN
//         INSERT INTO utenti (email) VALUES ('nuovo_indirizzo_email');
//         COMMIT TRANSACTION;
//         PRINT 'Indirizzo email inserito con successo';
//     END
//     ELSE
//     BEGIN
//         THROW 50000, 'Indirizzo email già presente', 1;
//     END
// END TRY
// BEGIN CATCH
//     ROLLBACK TRANSACTION;
//     PRINT 'Errore durante l''inserimento dell''indirizzo email: ' + ERROR_MESSAGE();
// END CATCH;


DB.prototype.insertUtente = function (query, callback = () => { }) {
  createConnection((conn, err) => {
    if (err.codeErr === 200) {
      let errQuery = { codeErr: 200, message: "" };
      conn.query(`INSERT INTO Utenti (Nome, Cognome, Email, Pwd) ` +
          `VALUES ('${query.nome}', '${query.cognome}', '${query.email}', '${query.password}')`
        , function (error, results) {
          if (error) {
            if(error.code === 'ER_DUP_ENTRY'){
              errQuery = { codeErr: 401, message: "Email già utilizzata" };
            }
            else{
              errQuery = { codeErr: 501, message: "Errore duranze l'esecuzione della query" };
            }
          }
          callback(results, errQuery);
          conn.end();
        });
    }
    else {
      callback(null, err);
    }
  });
}

DB.prototype.findLogin = function (query, callback = () => { }) {
  createConnection((conn, err) => {
    if(err.codeErr === 200){
      let errQuery = { codeErr: 200, message: "" };
      conn.query(`SELECT Utenti.Nome, Utenti.Cognome, Utenti.Email, Utenti.Pwd FROM Utenti WHERE Utenti.Email = '${query.email}'`, function(error, results, fields){
        if(error){
          errQuery = { codeErr: 501, message: "Errore durante l'esecuzione della query"};
        }
        if(results.length == 0){
          errQuery = {codeErr: 401, message: "Errore durante il Login. Credenziali errate!"};
        }
        else{
          console.log("PWD FROM CLIENT", bcrypt.hashSync(query.password, 12));
          const isValid = bcrypt.compareSync(query.password, results[0].Pwd);
          console.log(isValid);
          if(!isValid){
            errQuery = { codeErr: 401, message: "Errore durante il Login. Password errata!" };
          }
        }
        callback(results, errQuery);
        conn.end();
      });
    }
    else {
      callback(null, err);
    }
    
  });
}

DB.prototype.checkAdmin = function (query, callback = () => { }) {
  createConnection((conn, err) => {
    if(err.codeErr === 200){
      let errQuery = { codeErr: 200, message: "" };
      conn.query(`SELECT Utenti.Nome, Utenti.Cognome, Utenti.Email, Utenti.IS_Admin FROM Utenti WHERE Utenti.IS_Admin = 1 AND Utenti.Email = '${query.email}'`, function(error, results, fields){
        console.log(results, `SELECT * FROM Utenti WHERE Utenti.IS_Admin = 1 AND Utenti.Email = '${query.email}'`);
        if(error){
          errQuery = { codeErr: 501, message: "Errore durante l'esecuzione della query"};
          console.log(errQuery.message)
        }
        if(results.length == 0){
          errQuery = {codeErr: 401, message: "Non hai abbastanza permessi!"};
          console.log(errQuery.message)
        }
        else{
          console.log("ACCESSO RILEVATO GESTIONE UTENTI FROM", query.email);
        }
        callback(results, errQuery);
        conn.end();
      })
    }
    else {
      callback(null, err);
    }
  });
}

module.exports = new DB();