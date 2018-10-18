const ModelIndex = require('../models');
const User = ModelIndex.User;

const UserController = function() {};

UserController.addUser = function(firstname, lastname, phone, email, photo, address, password, id_categ){
  return User.create({
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    email: email,
    photo: photo,
    address: address,
    password: password,
    category_id: id_categ
  })
  .catch((err) => {
    console.error(err);
  })
};

UserController.deleteUser = function(idUser){
  return User.destroy({
    where:{
      id: idUser
    }
  })
  .then(() => {
      console.log("User was deleted.");
    })
    .catch((err) => {
      console.error(err);
    })
};


UserController.updateUser = function(idUser, newFirstname, newLastname, newPhone, newEmail, newPhoto, newAddress, newPassword, newId_categ) {
  return User.find({
    where:{
      id: idUser
    }
  })
  .then((user) => {
    if(user === undefined){
      return;
    }
  
    if(newFirstname === undefined) {
      newFirstname = user.firstname;
    }
  
    if(newLastname === undefined) {
      newLastname = user.lastname;
    }
  
    if(newPhone === undefined) {
      newPhone = user.phone;
    }
  
    if(newEmail === undefined) {
      newEmail = user.email;
    }
    if(newPhoto === undefined) {
      newPhoto = user.photo;
    }
    if(newAddress === undefined) {
      newAddress = user.address;
    }
    if(newPassword === undefined) {
      newPassword = user.password;
    }
    if(newId_categ === undefined) {
      newId_categ = user.category_id;
    }
  
    return user.updateAttributes({
      firstname: newFirstname,
      lastname: newLastname,
      phone: newPhone,
      email: newEmail,
      photo: newPhoto,
      address: newAddress,
      password: newPassword,
      category_id: newId_categ
    });

  })
  .catch((err)=>{
    console.error(err);
  });
  
};


UserController.getUserById = function(idUser){
  return User.find({
    where: {
      id: idUser
    }
  })
  .then((user) => {
    if(user) {
      console.log('User found.');
      return user;
    }
    return null;
  })
  .catch((error) => {
    console.error(err);
  });
};

/*
UserController.getAllUser = function(){
  return User.findAll()
  .catch((err) => {
    console.error(err);
  });
};


UserController.login = function(email, password){
  return User.find({
    where : {
      email : email,
      password : password
    }
  })
  .then((user)=>{
    if(user){
      return user;
    }
    else{
      return null;
    }
  })
};
*/
module.exports = UserController;
