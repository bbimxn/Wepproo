const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const conn = require('./database');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const sql = "SELECT * FROM albums";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('album', { albums: result });
    });
});

app.get('/create-albums', (req, res) => {
    const sql = `CREATE TABLE IF NOT EXISTS albums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        song VARCHAR(255),
        artist VARCHAR(255),
        album VARCHAR(255),
        year INT,
        genre VARCHAR(100),
        album_cover VARCHAR(255)
    );`;
    conn.query(sql, (err) => {
        if (err) throw err;
        res.send("Table 'albums' created successfully");
    });
});

app.get('/insert-albums', (req, res) => {
    const sql = `INSERT INTO albums (song, artist, album, year, genre, album_cover) VALUES 
    ('Shape of You', 'Ed Sheeran', 'Divide', 2017, 'Pop', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/shape-of-you.png'),
    ('Blinding Lights', 'The Weeknd', 'After Hours', 2019, 'Synthpop', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/blinding-lights.png'),
    ('Rolling in the Deep', 'Adele', '21', 2010, 'Soul', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/rolling-in-the-deep.jpg'),
    ('Uptown Funk', 'Mark Ronson ft. Bruno Mars', 'Uptown Special', 2014, 'Funk', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/uptown-funk.jpg'),
    ('Bad Guy', 'Billie Eilish', 'When We All Fall Asleep', 2019, 'Electropop', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/bad-guy.jpg'),
    ('Radioactive', 'Imagine Dragons', 'Night Visions', 2012, 'Alternative Rock', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/radioactive.png'),
    ('Someone Like You', 'Adele', '21', 2011, 'Ballad', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/someone-like-you.png'),
    ('Happy', 'Pharrell Williams', 'G I R L', 2013, 'Pop', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/pharrell-williams-happy.jpg'),
    ('Lose Yourself', 'Eminem', '8 Mile Soundtrack', 2002, 'Hip Hop', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/lose-yourself.jpg'),
    ('Smells Like Teen Spirit', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'http://webdev.it.kmitl.ac.th/labdocs/lab8/album-covers/Smells-Like-Teen-Spirit.jpg')`;
    
    conn.query(sql, (err) => {
        if (err) throw err;
        res.send("Music data inserted successfully");
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});