const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.use(express.static(__dirname)); 

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/pizza', function(req, res){
  res.sendFile(path.join(__dirname, 'pizza.html'))
}); 

app.get('/lasangna', function(req, res){
  res.sendFile(path.join(__dirname, 'lasangna.html'))
}); 

app.get('/hamburger', function(req, res){
  res.sendFile(path.join(__dirname, 'hamburger.html'))
});

app.get('/tacos', function(req, res){
  res.sendFile(path.join(__dirname, 'tacos.html'))
}); 

app.get('/smore', function(req, res){
  res.sendFile(path.join(__dirname, 'smore.html'))
}); 

app.get('/cheesecake', function(req, res){
  res.sendFile(path.join(__dirname, 'cheesecake.html'))
}); 
app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})