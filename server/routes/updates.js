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

//PUT request to update completionstatus in the database:
router.put('/', function(req, res){
  var checkIn = req.body;
  console.log('Put route called with task of ', checkIn);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      console.log(checkIn);
      var queryText = 'UPDATE "visits" SET "completionstatus" = $1 WHERE id = $2;';
      db.query(queryText, [checkIn.status, checkIn.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making UPDATE query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.put

router.delete('/:id', function(req, res){
  var id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM "pets" WHERE id = $1;';
      db.query(queryText, [id], function(errorMakingQuery, result){
        done(); //VERY IMPORTANT
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making DELETE FROM query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.delete

module.exports = router;
