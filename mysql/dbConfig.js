const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "markos1!",
    database: "capstone"
});

connection.connect(function(err){
    if(err) throw err;
});

module.exports = connection;