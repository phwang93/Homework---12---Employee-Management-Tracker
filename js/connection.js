const mysql = require('mysql2');

// Create DB Connection
const connection = mysql.createConnection({
    host: 'localhost',

    // DB Port
    port: 3005,

    //DB Username
    user: 'root',

    //DB Password
    password: 'root',
    database: 'empms_DB'
});

// MySQL connection start
connection.connect(error => {
    if (error) throw error
    console.log("CONNECTION NOT ACTIVE");

});

module.exports = connection;
