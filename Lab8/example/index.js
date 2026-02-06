// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database');  //ไม่ต้องใส่นามสกุล
const { name } = require('ejs');



// static resourse & template engine
app.use(express.static('public')); //กำหนดfloder
// Set EJS as templating engine 
app.set('view engine', 'ejs'); //กำหนดให้ใช้ template engin + กำหนดให้เปน view engin + ใช้โฟลเดอร์ views
// For parsing form data
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send(`
        <a href="/create">Create table</a><br>
        <a href="/insert">Insert data to table</a><br>
        <a href="/showdata">show data </a><br>
        <a href="/form">form</a><br>
        `);
});



// routing 
app.get('/create', (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE IF NOT EXISTS instructor (
        ID varchar(5) NOT NULL,
        name varchar(255) NOT NULL,
        dept_name varchar(255) NOT NULL,
        salary float,
        PRIMARY KEY (ID)
    );`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
    // then, Insert data into the table

});



app.get('/insert', (req, res) => {
    const sql = `INSERT INTO instructor (ID, name, dept_name, salary)
    VALUES 
    ('10101', 'Srinivasan', 'Comp. Sci.', 65000),
    ('12121', 'Wu', 'Finance', 90000),
    ('15151', 'Mozart', 'Music', 40000),
    ('22222', 'Einstein', 'Physics', 95000),
    ('32343', 'El Said', 'History', 60000);`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Data inserted successfully");
        res.send("Data inserted successfully");
    });
    // then, Insert data into the table
});



app.get('/showdata', (req, res) => {
    const sql = 'SELECT * FROM instructor;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('show', { data: result });
    });
});



app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});
app.get('/formget', (req, res) => {
    // read data from query string 

    /* แบบที่ 1 
    const id = req.query.id;
    const name = req.query.name;
    const deptname = req.query.deptname;
    const salary = req.query.salary;
    */

    //แบบที่ 2
    const {id,name,deptname,salary} = req.query;

    const insertSql = "INSERT INTO instructor (ID, name,dept_name,salary) VALUES (?,?,?,?)";
    
    conn.query(insertSql,[id,name,deptname,salary], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});




app.listen(port, () => {
    console.log(`listening to port ${port}`);
});