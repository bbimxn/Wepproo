const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('todo.db', (err) => {
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
    const query = 'SELECT * FROM todo';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        res.render("todo", { data: rows });
    });
});

const sql = `CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        deadline TEXT,
        completed INTEGER
);`;

db.run(sql, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table created successful');
});

app.get('/insert', (req, res) => {
    const sql = `INSERT OR REPLACE INTO todo (id, title, description, deadline, completed) VALUES 
    (1, 'Buy groceries', 'Buy milk, eggs, and bread', '2024-09-25', 0),
    (2, 'Study Python', 'Complete the basic syntax chapter', '2024-09-24', 1),
    (3, 'Exercise', 'Go for a 30-minute run', '2024-09-23', 0),
    (4, 'Clean the house', 'Vacuum and dust the living room', '2024-09-26', 1),
    (5, 'Read a book', 'Read 20 pages of the new novel', '2024-09-27', 0),
    (6, 'Plan vacation', 'Research hotels and flights', '2024-09-28', 0)`;

    db.run(sql, function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send("Data inserted successfully with descriptions");
    });
});

app.get("/add", (req, res) => {
    res.render("addTodo");
});

app.post("/api/todos", (req, res) => {
    const { title, description, deadline } = req.body;
    const sql = `INSERT INTO todo (title, description, deadline, completed) VALUES (?, ?, ?, 0)`;
    
    db.run(sql, [title, description, deadline], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log(`Starting server at port ${port}`);
});