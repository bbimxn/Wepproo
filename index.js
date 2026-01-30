const express = require('express')
const app = express()
const port = 3000

const path = require('path');

// Serve static files from multiple directories บอกว่าข้อมูลเราอยู่ในโฟลเดอรือะไร
app.use(express.static('public')); //ชื่อfloder
//app.use(express.static('files'));

// Or specify a virtual path prefix
//app.use('/static', express.static(path.join(__dirname, 'public')))



// method + path + ตัวแปร req + res = ที่แสดงให้ user
app.get('/', function(req, res){ // http://localhost:3000

  res.sendFile(path.join(__dirname, '/public/home.html'))

});

app.get('/about', function(req, res){
  res.sendFile(path.join(__dirname, '/public/about.html'))
}); 

app.get('/form', function(req, res){
  res.sendFile(path.join(__dirname, '/public/form.html'))
}); 

// Route handling query parameters
app.get('/submitform', (req, res) => {
  //ใน req.query ข้อมูลจะมาในรูปแบบ req.query.fname req.query.lname
  const { fname, lname } = req.query;
  res.send(`First name: ${fname}, Last name: ${lname}`);
});

/*app.get('/', function(req, res){ // http://localhost:3000

  res.sendFile(path.join(__dirname, '/public/home.html'))

  let html = `
  <h1>Homepage</h1>
  <ul>
    <li><a href = "/">Home</a></li>
    <li><a href = "/hello">Hello</a></li>
  </ul>
  `;

  //res.send("<h1>Welcome to the homepage!</h1>");
  res.send(html); //ตอนผู้ใช้มาใช้จะไม่รู้ path ส่วนใหญ่ผู้ใช้จะเรียก app all time menu

});*/


app.get('/hello', function(req, res){ // /hello คือ path http://localhost:3000/hello
  res.send("<h2>Hello World!, via GET</h2>");
}); 


app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})