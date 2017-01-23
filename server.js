var express = require('express');
var app = express();

var mysql = require('mysql');

app.use(express.static('dist'));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

app.get('/users', function(req, res) {
    connection.connect();

    res.send('works');

    connection.query('SELECT * FROM users', function (err, results, fields) {
        if (err) throw err;

        res.send(results);

        console.log('The solution is: ', rows[0].solution)
    });

    connection.end();
});

app.listen(8080);
console.log('Server is running on localhost:8080');