var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json())
app.use(express.static('dist'));

/* HEROKU DB CONFIG */
// var connection = mysql.createConnection({
//     database: 'heroku_d3e4e3664844155',
//     host: 'us-cdbr-iron-east-03.cleardb.net',
//     user: 'b0f240f41f3bea',
//     password: '02ebad9a'
// });

/* LOCAL DB CONFIG */
var connection = mysql.createConnection({
    database: 'notes_db',
    host: 'localhost',
    user: 'root',
    password: ''
});

app.get('/', () => connection.connect());

app.get('/notes', function(req, res) {
    connection.query('SELECT * FROM notes', function (err, results, fields) {
        if (err) throw err;

        res.send(results);
    });
});

app.get('/notes/:id', (request, response) => {
    const id = request.params.id;

    connection.query(`SELECT * FROM notes WHERE id=${id}`, function (err, results, fields) {
        if (err) throw err;

        response.send(results[0]);
    });
});

app.put('/notes/:id', (req, res) => {
    const id = req.body.id;
    const text = req.body.text;
    const name = req.body.name;

    connection.query(`UPDATE notes SET text='${text}', name='${name}' WHERE id=${id}`, (err, results, fields) => {
        if (err) throw err;

        res.send(results);
    });
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`DELETE FROM notes WHERE id='${id}';`, (err, results, fields) => {
        if (err) throw err;

        res.send(results);
    });
});

app.post('/note', (req, res) => {
    const name = req.body.name;
    const text = req.body.text;
    const parent = req.body.activeFolderId;

    connection.query(`INSERT INTO notes(name, text, parent_id) values('${name}', '${text}', '${parent}');`, response => {
        res.send(response);
    });
});

app.get('/folders', (req, res) => {
    connection.query(`SELECT * FROM folders;`, (err, results, fields) => {
        res.send(results);
    });
});

app.delete('/folders/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`DELETE FROM folders WHERE id='${id}';`, (err, results, fields) => {
        if (err) throw err;

        res.send(results);
    });
});

app.get('/folders/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`SELECT * FROM folders WHERE id='${id}';`, (err, results, fields) => {
        if (err) throw err;

        res.send(results[0]);
    });
});

app.put('/folders/:id', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    connection.query(`UPDATE folders SET name='${name}' WHERE id=${id}`, (err, results, fields) => {
        if (err) throw err;

        res.send(results);
    });
});

app.post('/folder', (req, res) => {
    const name = req.body.name;

    connection.query(`INSERT INTO folders(user_id, name, parent_id) values(1, '${name}', NULL);`, response => {
        res.send(response);
    });
});

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d", this.address().port);
});
