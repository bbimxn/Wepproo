const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('smartphones.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send(`<h1>Hello</h1>`)
});

const sql = `CREATE TABLE smartphones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Brand VARCHAR(50),
    Model VARCHAR(100),
    ReleaseYear INT,
    Display VARCHAR(100),
    Processor VARCHAR(100),
    RAM VARCHAR(20),
    Storage VARCHAR(20),
    RearCamera VARCHAR(100),
    FrontCamera VARCHAR(50),
    Battery VARCHAR(50),
    OS VARCHAR(50),
    Price DECIMAL(10, 2)
);`;

db.run(sql, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table created successful');
});


//--- Section 2 - Creating the Web Services

app.get('/smartphones', (req, res) => {
    const query = 'SELECT * FROM smartphones ';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.get('/smartphones/:id', (req, res) => { //เลือกแบบแค่อันเดียว
    // req.params.id ชื่อ  :id
    const query = `SELECT * FROM smartphones WHERE id = ${req.params.id}; `;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});



// --- Section 3 - Using the Web Services
// จาก Web Service ที่สร้างเอง
app.get("/show", (req, res) => {
    const endpoint = 'http://localhost:3000/smartphones';    //ใส่ URL WEBSERVICE ของเรา
    fetch(endpoint)
        .then(response => response.json()) //เปน str ที่เปนโครงสร้าง ่json to ่json
        .then(wsdata => {
            console.log(wsdata);
            res.render('show', { data: wsdata });            
        })
        .catch(error => {
            console.log(error);
        });
});

// จาก Web Service ที่อื่น
app.get("/showemployees", (req, res) => {

    //  ทุกรายการ  http://webdev.it.kmitl.ac.th:4000/employees';
    //  รายละเอียด http://webdev.it.kmitl.ac.th:4000/employee/id ';
    
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/employees';    
    fetch(endpoint)
        .then(response => response.json())
        .then(emp => {
            console.log(emp);
             res.render('showEmployee', { data: emp });        
        })
        .catch(error => {
            console.log(error);
        });
});


app.listen(port, () => {
    console.log(`Starting server at port ${port}`);
});