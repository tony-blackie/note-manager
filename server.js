var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json())
app.use(express.static('dist'));

/* HEROKU DB CONFIG */
var connection = mysql.createConnection({
    database: 'heroku_d3e4e3664844155',
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b0f240f41f3bea',
    password: '02ebad9a'
});

/* LOCAL DB CONFIG */
// var connection = mysql.createConnection({
//     database: 'notes_db',
//     host: 'localhost',
//     user: 'root',
//     password: ''
// });

app.get('/', () => connection.connect());

app.get('/notes', function(req, res) {
    connection.query('SELECT * FROM note', function (err, results, fields) {
        if (err) throw err;

        res.send(results);
    });
});

app.get('/notes/:id', (request, response) => {
    const id = request.params.id;

    connection.query(`SELECT * FROM note WHERE id=${id}`, function (err, results, fields) {
        if (err) throw err;

        response.send(results[0]);
    });
});

app.put('/notes/:id', (req, res) => {
    const id = req.body.id;
    const text = req.body.text;
    const name = req.body.name;

    connection.query(`UPDATE note SET text='${text}', name='${name}' WHERE id=${id}`, (err, results, fields) => {
        if (err) throw err;

        res.send(results);
    });
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`DELETE FROM note WHERE id='${id}';`, (err, results, fields) => {
        if (err) throw err;

        res.send(results);
    });
});

app.post('/note', (req, res) => {
    const name = req.body.name;
    const text = req.body.text;

    connection.query(`INSERT INTO note(name, text) values('${name}', '${text}');`, response => {
        res.send(response);
    });
});

app.listen(8080);
console.log('Server is running on localhost:8080');
