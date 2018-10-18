const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const UserController = controllers.UserController;
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const ensureAuthenticated = middlewares.ensureAuthenticated;

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(ensureAuthenticated);


userRouter.post('/', function(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const email = req.body.email;
  const photo = req.body.photo;
  const address = req.body.address;
  const password = sha1(req.body.password);

  const user =  UserController.addUser(firstname, lastname, phone, email, address, password)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(err.status || 500).json({ error: err.message || err, code: err.code || '' });
    });
});

userRouter.post('/login', function(req, res){
  const email = req.body.email;
  const password = sha1(req.body.password);

  const user = UserController.login(email, password)
  .then((user) => {
    if(user == null){
      return res.status(401).json({ error: 'Bad credentials', code: 401 });
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) =>{
      res.json({
        token
      });
    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.get('/allUser', function(req,res){
  UserController.getAllUser()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

/*
userRouter.get('/getUserById/:id' , function(req,res){
  UserController.getUserById(req.params.id)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});



userRouter.put('/updateUser' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
  if(err){
    res.status(403).end('Accès refusé');
      return;
  }
  else{
    const idUser = req.body.idUser;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    UserController.updateUser(idUser, username, password, email)
    .then(()=>{
      console.log("L'utilisateur à été mis à jour");
    })
    .catch((err) => {
      console.error(err);
    })
  }});
});
*/


module.exports = userRouter;
