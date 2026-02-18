const express = require("express");
const path = require("path");
const port = 3000;

//ของใหม่ที่เพิ่มมา
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('orders.db', (err) => {    //ใส่ชื่อไฟล์ database + ถ้าใส่ผิดไปก็จะสร้างฐานข้อมูลเปล่าในชื่อนั้นให้
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path

app.get('/', function (req, res) {
    const query = 'SELECT * FROM orders;';
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Database Error!");
        }
        
        console.log(rows); 
        res.render('home', { data: rows }); 
    });
});

app.get('/create', function (req, res) {
    const sql = `CREATE TABLE IF NOT EXISTS orders (
        ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        customer_name TEXT,
        product_name TEXT,
        status TEXT DEFAULT 'รอดำเนินการ'
    );`;

    db.run(sql, (err) => {
        if (err) {
            return console.error('Error creating table:', err.message);
        }
        console.log('Table created successful');
    });
})


// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});




//INSERT INTO orders (ID, customer_name, product_name, status) VALUES (1,'กนกวรรณ','รองเท้ากีฬา','รอดำเนินการ');
//INSERT INTO orders (ID, customer_name, product_name, status) VALUES (2,'วิภาดา','กระเป๋าเดินทาง','รอดำเนินการ');