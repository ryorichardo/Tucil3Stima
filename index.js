const express = require('express');
var path = require('path');
const app = express();
const port = 3000;
const mapboxgl = require('mapbox-gl');

app.use( express.static( "public" ) );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/test', (req, res) => {
    res.render('test');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

