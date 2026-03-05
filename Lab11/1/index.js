const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
let db = new sqlite3.Database('customers.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

app.get('/', (req, res) => {
    const sql = "SELECT CustomerId as id, FirstName as firstname, LastName as lastname, Address as address, Phone as phone, Email as email FROM customers ORDER BY RANDOM() LIMIT 1";
    db.get(sql, [], (err, row) => {
        res.render('employee', { emp: row || {} });
    });
});

app.post('/save', (req, res) => {
    res.cookie('empData', req.body, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false
    });
    res.render('employee', { emp: {} });
});

app.get('/show', (req, res) => {
    try {
        const savedData = req.cookies.empData || {};
        res.render('employee', { emp: savedData });
    } catch (err) {
        console.error('Error reading cookies:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/clear', (req, res) => {
    res.clearCookie('empData');
    res.render('employee', { emp: {} });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});