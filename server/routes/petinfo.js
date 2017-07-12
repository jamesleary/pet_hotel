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



module.exports = router;
