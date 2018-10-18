const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/category', require('./category'));
};

module.exports = RouteManager;