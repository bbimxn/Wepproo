const express = require("express");
const session = require("express-session");
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key-for-your-store',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    fetch('http://webdev.it.kmitl.ac.th:4000/restaurant')
        .then(res => res.json())
        .then(data => {
            res.render('menu', { data });
        })
        .catch(err => res.send("Error: " + err));
});

app.get('/add/:id/:name/:price', (req, res) => {
    if (!req.session.cart) req.session.cart = [];
    const { name, price } = req.params;
    req.session.cart.push({ name, price: parseInt(price) });
    res.redirect('/');
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    res.render('cart', { cart, total });
});

app.get('/confirm', (req, res) => {
    req.session.cart = [];
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Starting server at port ${PORT}`);
});