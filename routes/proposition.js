const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const PropositionController = controllers.PropositionController;
//const jwt = require('jsonwebtoken');

const propositionRouter = express.Router();
propositionRouter.use(bodyParser.json());

propositionRouter.post('/', function(req, res) {
  const description = req.body.description;
  
  let id_categ = parseInt(req.body.category_id);
  let id_user = parseInt(req.body.user_id);

  if(isNaN(id_categ)) {
    id_categ = undefined;
  }

  if(isNaN(id_user)) {
    id_user = undefined;
  }

  const proposition =  PropositionController.addProposition(description, id_categ, id_user)
    .then((proposition) => {
      res.status(201).json(proposition);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

propositionRouter.delete('/delete/:idProposition' , function(req,res){
  const idProposition = req.params.idProposition;

  if(idProposition === undefined){
    res.status(500).end();
    return;
  }
  PropositionController.deleteProposition(idProposition)
  .then((proposition) => {
    if(proposition) {
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

propositionRouter.put('/update' , function(req,res){
  const idProposition = req.body.id;
  const description = req.body.description;
  
  let id_categ = parseInt(req.body.category_id);
  let id_user = parseInt(req.body.user_id);

  if(isNaN(id_categ)) {
    id_categ = null;
  }

  if(isNaN(id_user)) {
    id_user = null;
  }

  PropositionController.updateProposition(idProposition, description, id_categ, id_user)
  .then((proposition)=>{
    if(proposition) {
      console.log("Proposition was successfully updated.");
      res.status(200).json(proposition);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

propositionRouter.get('/getById/:id' , function(req,res){
  PropositionController.getPropositionById(req.params.id)
  .then((proposition) => {
    if(proposition) {
      res.status(200).json(proposition);
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

module.exports = propositionRouter;
