const ModelIndex = require('../models');
const Proposition = ModelIndex.Proposition;

const PropositionController = function() {};

PropositionController.addProposition = function(description, categ_id, user_id){
  return Proposition.create({
    description: description,
    category_id: categ_id,
    user_id: user_id
  })
  .catch((err) => {
    console.error(err);
    return;
  })
};

PropositionController.deleteProposition = function(idProposition){
  return Proposition.destroy({
    where:{
      id: idProposition
    }
  })
  .then((proposition) => {
    if(proposition) {
      console.log("Proposition was deleted.");
      return true;
    } 
    return;
    })
    .catch((err) => {
      console.error(err);
      return;
    })
};


PropositionController.updateProposition = function(idProposition, newDescription, newCateg_id, newUser_id) {
  return Proposition.find({
    where:{
      id: idProposition
    }
  })
  .then((proposition) => {
    if(proposition === undefined || proposition === null){
      return;
    }
  
    if(newDescription === undefined || newDescription === null) {
      newDescription = proposition.description;
    }
  
    if(newCateg_id === undefined || newCateg_id === null) {
      newCateg_id = proposition.category_id;
    }
  
    if(newUser_id === undefined || newUser_id === null) {
      newUser_id = proposition.user_id;
    }

    return proposition.updateAttributes({
      description: newDescription,
      category_id: newCateg_id,
      user_id: newUser_id
    });

  })
  .catch((err)=>{
    console.error(err);
    return;
  });
};


PropositionController.getPropositionById = function(idProposition){
  return Proposition.find({
    where: {
      id: idProposition
    }
  })
  .then((proposition) => {
    if(proposition) {
      console.log('Proposition found.');
      return proposition;
    }
    return;
  })
  .catch((error) => {
    console.error(err);
    return;
  });
};


module.exports = PropositionController;