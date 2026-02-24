const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('restaurant.db', (err) => {
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
    res.send(`<h1>Hello - Restaurant Home</h1><a href="/restaurant">Go to Restaurant Menu</a>`);
});

//ดึงข้อมูลจาก resource ที่กำหนดมา ใช้ในหน้า restaurant
app.get("/restaurant", (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            res.render('showRestaurant', { data: data });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Error fetching data");
        });
});

app.get("/detail/:id", (req, res) => {
    const foodId = req.params.id;
    const endpoint = `http://webdev.it.kmitl.ac.th:4000/detail/${foodId}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(food => {
            res.render('detail', { food: food });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Error fetching detail");
        });
});

app.listen(port, () => {
    console.log(`Starting server at port ${port}`);
});