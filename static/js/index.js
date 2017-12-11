

var mysql = require('mysql');

function el(selector) {
    return document.getElementById(selector);
}

el('action-btn').addEventListener('click', function(){
    // Get the mysql service
    getFirstTenRows(function(rows){
        var html = '';

        rows.forEach(function(row){
            html += '<tr>';
            html += '<td>';
            html += row.id;
            html += '</td>';
            html += '<td>';
            html += row.name;
            html += '</td>';
            html += '</tr>';
            console.log(row);
        });

        document.querySelector('#table > tbody').innerHTML = html;
    });
},false);

function getFirstTenRows(callback){
    var mysql = require('mysql');

    // Add the credentials to access your database
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : null,
        database : 'ourcodeworld'
    });

    // connect to mysql
    connection.connect(function(err) {
        // in case of error
        if(err){
            console.log(err.code);
            console.log(err.fatal);
        }
    });

    // Perform a query
    $query = 'SELECT `id`,`name` FROM `articles` LIMIT 10';

    connection.query($query, function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        callback(rows);

        console.log("Query succesfully executed");
    });

    // Close the connection
    connection.end(function(){
        // The connection has been closed
    });