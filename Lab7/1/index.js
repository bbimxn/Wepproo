const express = require('express')
const app = express()
const port = 3000

const path = require('path');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/about', function(req, res){
  res.sendFile(path.join(__dirname, '/public/about.html'))
}); 

app.get('/eevee', function(req, res){
  res.sendFile(path.join(__dirname, '/public/eevee.html'))
}); 

app.get('/pichu', function(req, res){
  res.sendFile(path.join(__dirname, '/public/pichu.html'))
}); 

app.get('/riolu', function(req, res){
  res.sendFile(path.join(__dirname, '/public/riolu.html'))
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})