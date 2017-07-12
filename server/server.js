var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 5000;
var owners = require('.routes/owners.js');
var petinfo = require('.routes/petinfo.js');
var updates = require('.routes/updates.js');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/owners', owners);

app.use('/petInfo', petinfo);

app.use('/updateTable', updates);

app.get('/*', function(req, res){
  var file = req.params[0] || '/views/index.html';
res.sendFile(path.join(__dirname, "/public/", file));
});

app.listen(port, function(){
  console.log('starting application');
  console.log('listening on port:', port);
});
