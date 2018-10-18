const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/user', require('./user'));
  app.use('/category', require('./category'));
};

module.exports = RouteManager;