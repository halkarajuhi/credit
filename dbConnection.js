const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "localhost", // HOST NAME
    user: "credo", // USER NAME
    database: "db_credo", // DATABASE NAME
    password: "TrxTrx@88", // DATABASE PASSWOR
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;
