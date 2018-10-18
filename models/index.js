'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const basename = path.basename(module.filename);

const ModelIndex = {};

ModelIndex.getModel = function (modelName) {
    return this[modelName];
};

// prod
<<<<<<< HEAD
const config = {
    user: process.env.DATA_MYSQL_USER || 'mysql',
    host: process.env.DATA_MYSQL_HOST || 'twodo.dokku.aws.me',
    port: process.env.DATA_MYSQL_PORT || 2117,
    database: process.env.DATA_MYSQL_DATABASE || 'twodo-sql',
    password: process.env.DATA_MYSQL_PASS || 'f17bbb04b81f5565',
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    port: config.port,
    operatorsAliases: Op
});
=======
// const sequelize = new Sequelize('twodo-sql', 'mysql', 'f17bbb04b81f5565', {
//     host: 'twodo.dokku.aws.me',
//     dialect: 'mysql',
//     port: 2117,
//     operatorsAliases: Op
// });
>>>>>>> chris

// local
const sequelize = new Sequelize('twodo-sql', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  operatorsAliases: Op
});

// LOAD MODELS
fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
          ModelIndex[model.name] = model;
    });

// ASSOCIATE MODELS
Object.keys(ModelIndex)
.forEach((modelName) => {
    if (ModelIndex[modelName].associate) {
        ModelIndex[modelName].associate(ModelIndex);
    }
});

ModelIndex.sequelize = sequelize;
ModelIndex.Sequelize = Sequelize;
ModelIndex.openDatabase = function() {
  return sequelize
      .authenticate()
      .then(() => sequelize.sync({force: true}));
};

module.exports = ModelIndex;
