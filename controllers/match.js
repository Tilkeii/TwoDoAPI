const ModelIndex = require('../models');
const Match = ModelIndex.Match;
const sequelize = ModelIndex.sequelize;

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
  .catch((err) => {
    console.error(err);
    return;
  });
};

MatchController.setMatchLike = function(id_user_1, id_user_2, idCateg, type){
  return Match.find({
    where: {
      user_id_1: id_user_1,
      user_id_2: id_user_2,
      category_id: idCateg
    }
  })
  .then((match) => {
    if(match) {
      console.log('Match like found.');
      if(type === 3) {
        return MatchController.updateMatch(match.id, id_user_1, id_user_2, idCateg, null, 2, new Date());
      } else if(type === 1) {
        return MatchController.updateMatch(match.id, id_user_1, id_user_2, idCateg, 2, null, new Date());
      }
      return;
    }
    if(type === 3) {
      return MatchController.addMatch(id_user_1, id_user_2, idCateg, 0, 2, new Date());
    } else if(type === 1) {
      return MatchController.addMatch(id_user_1, id_user_2, idCateg, 2, 0, new Date());
    }
    return;
  })
  .catch((err) => {
    console.error(err);
    return;
  });
};

MatchController.setMatchPass = function(id_user_1, id_user_2, idCateg, type){
  return Match.find({
    where: {
      user_id_1: id_user_1,
      user_id_2: id_user_2,
      category_id: idCateg
    }
  })
  .then((match) => {
    if(match) {
      console.log('Match pass found.');
      if(type === 2) {
        return MatchController.updateMatch(match.id, id_user_1, id_user_2, idCateg, null, 1, new Date());
      } else if(type === 0) {
        return MatchController.updateMatch(match.id, id_user_1, id_user_2, idCateg, 1, null, new Date());
      }
      return;
    }
    if(type === 2) {
      return MatchController.addMatch(id_user_1, id_user_2, idCateg, 0, 1, new Date());
    } else if(type === 0) {
      return MatchController.addMatch(id_user_1, id_user_2, idCateg, 1, 0, new Date());
    }
    return;
  })
  .catch((err) => {
    console.error(err);
    return;
  });
};


MatchController.getAllMatch = function(idUser){
  return sequelize.query("SELECT * FROM `match` WHERE status_user_1 = 2 AND status_user_2 = 2 " +
    "AND (user_id_1 = :idUser OR user_id_2 = :idUser)",
    { replacements: { idUser: idUser }, type: sequelize.QueryTypes.SELECT })
  .then((match) => {
    if(match) {
      console.log('My all match found.');
      return match;
    }
    return;
  })
  .catch((error) => {
    console.error(err);
    return;
  });
};


MatchController.getNextMatchSearch = function(idUser, idCategory){
  return sequelize.query("SELECT u.*, p.description FROM user u, proposition p " +
    "WHERE p.user_id = u.id AND p.user_id != :idUser AND p.category_id = :idCategory",
    { replacements: { idUser: idUser, idCategory: idCategory }, type: sequelize.QueryTypes.SELECT })
  .then((match) => {
    if(match) {
      console.log('My next match search found.');
      return match;
    }
    return;
  })
  .catch((err) => {
    console.error(err);
    return;
  });
};

MatchController.getNextMatchProposition = function(idUser, idCategory){
  return sequelize.query("SELECT u.*, m.status_user_1, m.status_user_2, m.date FROM `match` m, user u " + 
    "WHERE u.id = m.user_id_1 AND m.status_user_1 = 2 AND m.status_user_2 = 0 " +
    "AND m.category_id = :idCateg AND m.user_id_1 != :idUser",
    { replacements: { idCateg: idCategory, idUser: idUser }, type: sequelize.QueryTypes.SELECT })
  .then((match) => {
    if(match) {
      console.log('My next match proposition found.');
      return match;
    }
    return;
  })
  .catch((err) => {
    console.error(err);
    return;
  });
};


module.exports = MatchController;