const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const conn = require('./database');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));

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

app.get('/formget', (req, res) => {
    const { username, password, email, firstname, lastname, age, address, phone } = req.query;
    const insertSql = `INSERT INTO Users (username, password, email, firstname, lastname, age, address, phone) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    conn.query(insertSql, [username, password, email, firstname, lastname, age, address, phone], (err, result) => {
        if (err) return res.send("Error: " + err.message);
        res.redirect('/showdata');
    });
});

app.get('/login-process', (req, res) => {
    const { user_input, password } = req.query;
    const sql = "SELECT * FROM Users WHERE username = ? OR email = ?";

    conn.query(sql, [user_input, user_input], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            res.send("ไม่พบบัญชีผู้ใช้");
        } else {
            const user = result[0];
            if (user.password !== password) {
                res.send("รหัสผ่านไม่ถูกต้อง");
            } else {
                res.render('show', { data: result });
            }
        }
    });
});

app.get('/showdata', (req, res) => {
    const sql = 'SELECT * FROM Users;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('show', { data: result });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});