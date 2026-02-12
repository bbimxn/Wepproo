const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const conn = require('./database'); 

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/create', (req, res) => {
    const sql = `CREATE TABLE IF NOT EXISTS Users (
        username VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(100),
        firstname VARCHAR(100),
        lastname VARCHAR(100),
        age INT,
        address TEXT,
        phone VARCHAR(15),
        PRIMARY KEY (username)
    );`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Table 'Users' created successfully");
    });
});

app.get('/insert', (req, res) => {
    const sqlInsert = `INSERT INTO Users (username, password, email, firstname, lastname, age, address, phone)
    VALUES 
    ('johndoe88', 'p@ssword123', 'john.doe@email.com', 'John', 'Doe', 28, '123 Maple St, New York', '555-0101'),
    ('sarah_smith', 'smith789', 'sarah.s@email.com', 'Sarah', 'Smith', 24, '456 Oak Ave, California', '555-0202'),
    ('mike_pro', 'mike999', 'mike.pro@email.com', 'Michael', 'Johnson', 32, '789 Pine Rd, Texas', '555-0303'),
    ('emily_rose', 'rose_pass', 'emily.r@email.com', 'Emily', 'Rose', 21, '101 Birch Ln, Florida', '555-0404');`;

    conn.query(sqlInsert, function (err, result) {
        if (err) throw err;
        res.send("Sample data inserted successfully");
    });
});

app.get('/showdata', (req, res) => {
    const sql = 'SELECT * FROM Users;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('show', { data: result }); 
    });
});

app.get('/formget', (req, res) => {
    const { username, password, email, firstname, lastname, age, address, phone } = req.query;

    const insertSql = `INSERT INTO Users (username, password, email, firstname, lastname, age, address, phone) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertSql, [username, password, email, firstname, lastname, age, address, phone], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error: " + err.message);
        }
        res.redirect('/showdata'); 
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});