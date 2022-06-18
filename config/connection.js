const mysql = require('mysql2');

// Create DB Connection
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST_LOG,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT || 8889,
});

// MySQL connection start and error
connection.connect(error => {
    if (error) console.log("\nCONNECTION NOT ACTIVE", error)

});

module.exports = connection;
