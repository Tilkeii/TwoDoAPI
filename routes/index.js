const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/user', require('./user'));
  app.use('/proposition', require('./proposition'));
};

module.exports = RouteManager;