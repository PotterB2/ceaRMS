const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'research_db'
};

const dbConnect = mysql.createConnection(dbConfig);

dbConnect.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully');
    }
});

module.exports = dbConnect;
