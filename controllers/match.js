const ModelIndex = require('../models');
const Match = ModelIndex.Match;

const MatchController = function() {};

MatchController.addMatch = function(user_id_1, user_id_2, category_id, status_user_1, status_user_2, date){
  return Match.create({
    user_id_1: user_id_1,
    user_id_2: user_id_2,
    category_id: category_id,
    status_user_1: status_user_1,
    status_user_2: status_user_2,
    date: date
  })
  .catch((err) => {
    console.error(err);
    return;
  })
};

MatchController.deleteMatch = function(idMatch){
  return Match.destroy({
    where:{
      id: idMatch
    }
  })
  .then((match) => {
    if(match) {
      console.log("Match was deleted.");
      return true;
    } 
    return;
    })
    .catch((err) => {
      console.error(err);
      return;
    })
};


MatchController.updateMatch = function(idMatch, new_user_id_1, new_user_id_2, new_category_id, new_status_user_1, new_status_user_2, new_date) {
  return Match.find({
    where:{
      id: idMatch
    }
  })
  .then((match) => {
    if(match === undefined || match === null){
      return;
    }
  
    if(new_user_id_1 === undefined || new_user_id_1 === null) {
      new_user_id_1 = match.user_id_1;
    }
  
    if(new_user_id_2 === undefined || new_user_id_2 === null) {
      new_user_id_2 = match.user_id_2;
    }
  
    if(new_category_id === undefined || new_category_id === null) {
      new_category_id = match.category_id;
    }

    if(new_status_user_1 === undefined || new_status_user_1 === null) {
      new_status_user_1 = match.status_user_1;
    }

    if(new_status_user_2 === undefined || new_status_user_2 === null) {
      new_status_user_2 = match.status_user_2;
    }

    if(new_date === undefined || new_date === null) {
      new_date = match.date;
    }

    return match.updateAttributes({
      user_id_1: new_user_id_1,
      user_id_2: new_user_id_2,
      category_id: new_category_id,
      status_user_1: new_status_user_1,
      status_user_2: new_status_user_2,
      date: new_date
    });

  })
  .catch((err)=>{
    console.error(err);
    return;
  });
};


MatchController.getMatchById = function(idMatch){
  return Match.find({
    where: {
      id: idMatch
    }
  })
  .then((match) => {
    if(match) {
      console.log('Match found.');
      return match;
    }
    return;
  })
  .catch((error) => {
    console.error(err);
    return;
  });
};


module.exports = MatchController;