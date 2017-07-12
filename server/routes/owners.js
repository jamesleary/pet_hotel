var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'pet_hotel',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeOutMillis: 30000,
};

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "owners"';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making SELECT * FROM query');
          res.sendStatus(500);
        } else {
          res.send({tasks: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end router.get

router.post('/', function(req, res) {
  var todo = req.body;
  console.log(todo);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "todolist" ("task", "completionstatus")' +
      ' VALUES ($1, $2);';
      db.query(queryText, [todo.task, todo.status], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making INSERT INTO query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.post

module.exports = router;
