const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


let db = new sqlite3.Database('user.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// Routes
app.get('/', (req, res) => {
    const query = 'SELECT * FROM user ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.render('home', { data: rows });
    });
});

app.get('/create', (req, res) => {
    const sql = ` CREATE TABLE user (
        ID INTEGER PRIMARY KEY ,
        FirstName NVARCHAR(20),
        LastName NVARCHAR(20),
        Username NVARCHAR(20),
        Email NVARCHAR(60) ); `;

    db.run(sql, (err) => {
        if (err) {
            return console.error('Error creating table:', err.message);
        }
        console.log('Table created successful');
    });
});
app.get('/submit', (req, res) => {
    const { ID, FirstName, LastName, Username, Email } = req.query;
    
    // เปลี่ยนคำว่า INSERT INTO เป็น REPLACE INTO จบเลย!
    const sql = `REPLACE INTO user (ID, FirstName, LastName, Username, Email) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [ID, FirstName, LastName, Username, Email], (err) => {
        if (err) {
            console.error('Error Mess:', err.message);
            return res.status(500).send("database Err");
        }
        console.log('Database Inserted/Updated');
        res.redirect('/');
    });
});

app.get('/show', function (req, res) {
    const query = 'SELECT * FROM user ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.render('show', { data: rows });
    });
});

// --- หน้าแสดงรายชื่อ (User List) ---
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.all(sql, [], (err, rows) => {
        // ส่ง rows ไปในชื่อ 'data' เพื่อให้หน้า show.ejs เอาไป forEach
        res.render('home', { data: rows }); 
    });
});

// --- หน้าแสดงรายละเอียดรายบุคคล (User Detail) ---
app.get('/detail/:id', (req, res) => {
    const id = req.params.id; // ดึง id จาก URL
    const sql = 'SELECT * FROM user WHERE ID = ?';
    db.get(sql, [id], (err, row) => {
        // ส่งข้อมูลคนเดียว (row) ไปในชื่อ 'user'
        res.render('home', { user: row }); 
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});