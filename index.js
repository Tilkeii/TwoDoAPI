const express = require('express');
const dbManager = require('./db_connection');
const RouteManager = require('./routes');
/*
ModelIndex
.openDatabase()
.then(_startServer)
.catch((err) => {
  console.error(err);
});
*/
dbManager.connect(function(err) {
  if (err) throw err;
  _startServer();
});

function _startServer() {

  const app = express();

  RouteManager.attach(app);

  app.listen(8081, function() {
    console.log('Server started on 8081...');
  });
}