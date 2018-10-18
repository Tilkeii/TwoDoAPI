const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/user', require('./user'));
  app.use('/proposition', require('./proposition'));
  app.use('/category', require('./category'));
};

module.exports = RouteManager;