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
    return;
  })
};

UserController.deleteUser = function(idUser){
  return User.destroy({
    where:{
      id: idUser
    }
  })
  .then((user) => {
    if(user) {
      console.log("User was deleted.");
      return true;
    } 
    return;
  })
  .catch((err) => {
    console.error(err);
    return;
  })
};


UserController.updateUser = function(idUser, newFirstname, newLastname, newPhone, newEmail, newPhoto, newAddress, newPassword, newId_categ) {
  return User.find({
    where:{
      id: idUser
    }
  })
  .then((user) => {
    if(user === undefined || user === null){
      return;
    }
  
    if(newFirstname === undefined || newFirstname === null) {
      newFirstname = user.firstname;
    }
  
    if(newLastname === undefined || newLastname === null) {
      newLastname = user.lastname;
    }
  
    if(newPhone === undefined || newPhone === null) {
      newPhone = user.phone;
    }
  
    if(newEmail === undefined || newEmail === null) {
      newEmail = user.email;
    }
    if(newPhoto === undefined || newPhoto === null) {
      newPhoto = user.photo;
    }
    if(newAddress === undefined || newAddress === null) {
      newAddress = user.address;
    }
    if(newPassword === undefined || newPassword === null) {
      newPassword = user.password;
    }
    if(newId_categ === undefined || newId_categ === null) {
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
    return;
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
    return;
  })
  .catch((error) => {
    console.error(err);
    return;
  });
};


module.exports = UserController;
