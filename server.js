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

app.get('/notes', function(req, res) {
    connection.connect();

    connection.query('SELECT * FROM note', function (err, results, fields) {
        if (err) throw err;

        res.send(results);
    });

    connection.end();
});

app.get('/notes/:id', (request, response) => {

    const id = request.params.id;
    const name = request.params.name;
    const text = request.params.text;
    response.send(
        {
            id: id,
            name: 'someName',
            text: 'someText'
        }
    );
});

app.listen(8080);
console.log('Server is running on localhost:8080');
