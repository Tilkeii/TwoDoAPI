const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const MatchController = controllers.MatchController;
//const jwt = require('jsonwebtoken');

const matchRouter = express.Router();
matchRouter.use(bodyParser.json());

matchRouter.post('/', function(req, res) {
  const date = new Date();
  
  let user_id_1 = parseInt(req.body.user_id_1);
  let user_id_2 = parseInt(req.body.user_id_2);
  let category_id = parseInt(req.body.category_id);
  let status_user_1 = parseInt(req.body.status_user_1);
  let status_user_2 = parseInt(req.body.status_user_2);

  if(isNaN(user_id_1)) {
    user_id_1 = null;
  }

  if(isNaN(user_id_2)) {
    user_id_2 = null;
  }

  if(isNaN(category_id)) {
    category_id = null;
  }

  if(isNaN(status_user_1) || [0, 1, 2].indexOf(status_user_1) === -1) {
    status_user_1 = null;
  }

  if(isNaN(status_user_2) || [0, 1, 2].indexOf(status_user_2) === -1) {
    status_user_2 = null;
  }

  const match =  MatchController.addMatch(user_id_1, user_id_2, category_id, status_user_1, status_user_2, date)
    .then((match) => {
      res.status(201).json(match);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

matchRouter.delete('/delete/:idMatch' , function(req,res){
  const idMatch = req.params.idMatch;

  if(idMatch === undefined || idMatch === null){
    res.status(500).end();
    return;
  }
  MatchController.deleteMatch(idMatch)
  .then((match) => {
    if(match) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

matchRouter.put('/update' , function(req,res){
  const idMatch = req.body.id;
  const date = new Date();
  
  let user_id_1 = parseInt(req.body.user_id_1);
  let user_id_2 = parseInt(req.body.user_id_2);
  let category_id = parseInt(req.body.category_id);
  let status_user_1 = parseInt(req.body.status_user_1);
  let status_user_2 = parseInt(req.body.status_user_2);

  if(isNaN(user_id_1)) {
    user_id_1 = null;
  }

  if(isNaN(user_id_2)) {
    user_id_2 = null;
  }

  if(isNaN(category_id)) {
    category_id = null;
  }

  if(isNaN(status_user_1) || [0, 1, 2].indexOf(status_user_1) === -1) {
    status_user_1 = null;
  }

  if(isNaN(status_user_2) || [0, 1, 2].indexOf(status_user_2) === -1) {
    status_user_2 = null;
  }

  MatchController.updateMatch(idMatch, user_id_1, user_id_2, category_id, status_user_1, status_user_2, date)
  .then((match)=>{
    if(match) {
      console.log("Match was successfully updated.");
      res.status(200).json(match);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

matchRouter.post('/changeMatch' , function(req,res){
  const date = new Date();
  
  /**
   * Type == 0 is people who pass a search
   * Type == 1 is people who like for a search
   * Type == 2 is people who pass a proposition
   * Type == 3 is people who like a proposition
   */
  let type = parseInt(req.body.type);

  let user_id_1 = parseInt(req.body.user_id_1);
  let user_id_2 = parseInt(req.body.user_id_2);
  let category_id = parseInt(req.body.category_id);


  if(isNaN(user_id_1)) {
    user_id_1 = null;
  }

  if(isNaN(user_id_2)) {
    user_id_2 = null;
  }

  if(isNaN(category_id)) {
    category_id = null;
  }

  if(isNaN(type)) {
    type = null;
  }

  if(type === 0 || type === 2) {
    MatchController.setMatchPass(user_id_1, user_id_2, category_id, type)
    .then((match)=>{
      if(match) {
        console.log("Match was successfully updated.");
        res.status(200).json(match);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
  } else if(type === 1 || type === 3) {
    MatchController.setMatchLike(user_id_1, user_id_2, category_id, type)
    .then((match)=>{
      if(match) {
        console.log("Match was successfully updated.");
        res.status(200).json(match);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
  } else {
    res.status(500).end();
  }
});

matchRouter.get('/getById/:id' , function(req,res){
  MatchController.getMatchById(req.params.id)
  .then((match) => {
    if(match) {
      res.status(200).json(match);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

// All match where two users have accepted
matchRouter.get('/getAllMatch/:idUser' , function(req,res){
  MatchController.getAllMatch(req.params.idUser)
  .then((match) => {
    if(match) {
      res.status(200).json(match);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

// All match for people who search by category
matchRouter.get('/getNextMatchSearch/:idUser/:idCateg' , function(req,res){
  MatchController.getNextMatchSearch(req.params.idUser, req.params.idCateg)
  .then((match) => {
    if(match) {
      res.status(200).json(match);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

// All match for people who propose a service
matchRouter.get('/getNextMatchPropos/:idUser/:idCateg' , function(req,res){
  MatchController.getNextMatchProposition(req.params.idUser, req.params.idCateg)
  .then((match) => {
    if(match) {
      res.status(200).json(match);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

module.exports = matchRouter;
