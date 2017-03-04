var express = require('express');
var app = express();

var mysql = require('mysql');

app.use(express.static('dist'));

var connection = mysql.createConnection({
    database: 'notes_db',
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: ''
});

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

app.listen(8080);
console.log('Server is running on localhost:8080');
