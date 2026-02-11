// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const conn = require('./database'); 

app.use(express.static('public')); 
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM Users;'; 
    conn.query(sql, (err, result) => {
        if (err) {
            return res.send("No data found. <br><a href='/create'>Click here to create Table and Sample Data</a>");
        }
        res.render('show', { data: result }); 
    });
});

app.get('/create', (req, res) => {
    const createTable = `CREATE TABLE IF NOT EXISTS Users (
        username varchar(50) NOT NULL,
        password varchar(255) NOT NULL,
        email varchar(100) NOT NULL,
        firstname varchar(100),
        lastname varchar(100),
        age int,
        address varchar(255),
        phone varchar(20),
        PRIMARY KEY (username)
    );`;

    conn.query(createTable, (err) => {
        if (err) return res.status(500).send(err.message);
        
        const seedSql = `INSERT IGNORE INTO Users VALUES ?`;
        const values = [
            ['somchai88', 'p@ssw0rd123', 'somchai.s@email.com', 'Somchai', 'Saetang', 28, '123 BKK', '081-234-5678'],
            ['jane_doe', 'jane_secure!', 'jane.doe@provider.net', 'Jane', 'Doe', 32, '456 CM', '089-876-5432'],
            ['baimon_42', 'discovery2026', 'baimon.dev@piscine.com', 'Baimon', 'Coding', 21, '42 Discovery Lane', '02-111-2222']
        ];

        conn.query(seedSql, [values], (err) => {
            if (err) return res.status(500).send(err.message);
            console.log("Table and Sample Data created!");
            res.redirect('/'); // go back to home to see the table
        });
    });
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.post('/register', (req, res) => {
    // get data from the form
    const { username, password, email, firstname, lastname, age, address, phone } = req.body;
    
    const sql = "INSERT INTO Users VALUES (?,?,?,?,?,?,?,?)";
    
    conn.query(sql, [username, password, email, firstname, lastname, age, address, phone], (err) => {
        if (err) return res.status(500).send(err.message);
        console.log("New user registered!");
        res.redirect('/'); // go back to home to see new data
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});