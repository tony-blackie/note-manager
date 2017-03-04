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
    connection.connect();

    connection.query('SELECT * FROM note', function (err, results, fields) {
        if (err) throw err;

        res.send(results);
    });

    connection.end();
});

app.get('/notes/:id', (request, response) => {
    const id = request.params.id;

    const dbQuery = `select * from note where id=${id}`;
    // let name, text;

    // switch(id) {
    //     case '0':
    //       name = 'Name 1';
    //       text = 'This is a text of the first note';
    //       break;
    //     case '1':
    //       name = 'Name 2';
    //       text = 'Text of the second note is very different';
    //       break;
    //     case '2':
    //       name = 'Name 3';
    //       text = 'Very original text';
    //       break;
    //     default:
    //       console.log('fail');
    //       return;
    // }
    //
    // response.send(
    //     {
    //         id: id,
    //         name: name,
    //         text: text
    //     }
    // );

    connection.query(dbQuery, function (err, results, fields) {
        if (err) throw err;

        response.send(results[0]);
    });
});

app.listen(8080);
console.log('Server is running on localhost:8080');
