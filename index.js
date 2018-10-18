require('dotenv').config()

const express = require('express');
const ModelIndex = require('./models');
const RouteManager = require('./routes');

ModelIndex
.openDatabase()
.then(_startServer)
.catch((err) => {
  console.error(err);
});

function _startServer() {

  const app = express();

  RouteManager.attach(app);

  app.listen(5000, function() {
    console.log('Server started on 5000...');
  });
}
