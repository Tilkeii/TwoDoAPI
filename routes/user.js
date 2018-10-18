const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UserController = controllers.UserController;
//const jwt = require('jsonwebtoken');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post('/', function(req, res) {
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

  const user =  UserController.addUser(firstname, lastname, phone, email, photo, address, password, id_categ)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
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


module.exports = userRouter;
