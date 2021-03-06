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

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "owners";';
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
  var newOwner = req.body;
  console.log(newOwner);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "owners" ("first_name", "last_name")' +
      ' VALUES ($1, $2);';
      db.query(queryText, [newOwner.first_name, newOwner.last_name], function(errorMakingQuery, result){
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
