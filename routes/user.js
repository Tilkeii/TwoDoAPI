const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const UserController = controllers.UserController;
const sha1 = require('sha1');
const ensureAuthenticated = middlewares.ensureAuthenticated;

const userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: true }));
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

  let id_categ = parseInt(req.body.id_category);

  if(isNaN(id_categ)) {
    id_categ = null;
  }

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
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(401).json({ error: 'Bad credentials', code: 401 });
  }

  const email = req.body.email;
  const password = sha1(req.body.password);

  const user = UserController.login(email, password)
  .then((user) => {
    if(user == null){
      return res.status(401).json({ error: 'Bad credentials', code: 401 });
    }

    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.delete('/delete/:idUser' , function(req,res){
  const idUser = req.params.idUser;

  if(idUser === undefined){
    res.status(500).end();
    return;
  }
  UserController.deleteUser(idUser)
  .then((user) => {
    if(user) {
      res.status(204).json(user);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.put('/update' , function(req,res){
  const idUser = req.body.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const email = req.body.email;
  const photo = req.body.photo;
  const address = req.body.address;
  const password = req.body.password;

  let id_categ = parseInt(req.body.id_category);

  if(isNaN(id_categ)) {
    id_categ = null;
  }

  UserController.updateUser(idUser, firstname, lastname, phone, email, photo, address, password, id_categ)
  .then((user)=>{
    if(user) {
      console.log("User was successfully updated.");
      res.status(200).json(user);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

userRouter.get('/getById/:id' , function(req,res){
  UserController.getUserById(req.params.id)
  .then((user) => {
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


userRouter.put('/editPhoto' , function(req,res){
  const idUser = req.body.id;
  const photo = req.body.photo;

  UserController.updatePhoto(idUser, photo)
  .then((user)=>{
    if(user) {
      console.log("User photo was successfully updated.");
      res.status(200).json(user);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


module.exports = userRouter;
