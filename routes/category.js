
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const CategoryController = controllers.CategoryController;

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.post('/category', function(req, res) {
    const name = req.body.name;

    const category =  CategoryController.addCategory(name)
        .then((category) => {
            res.status(201).json(category);
        })
        .catch((err) => {
            res.status(500).end();
        });
});

categoryRouter.get('/getAllCategory', function(req, res) {

    CategoryController.getAllCategory()
        .then((categories) => {
            res.status(201).json(categories);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        })
});

categoryRouter.get('/getCategoryById/:id' , function(req,res){
    CategoryController.getCategoryById(req.params.id)
        .then((category) => {
            res.status(201).json(category);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        })
});
;

categoryRouter.delete('/deleteCategory/:idCategory' , function(req,res){
    const idCategory = req.params.idCategory;

    if(idCategory === undefined){
        res.status(500).end();
        return;
    }
    const idUser = req.params.idCategory;

    if(idUser === undefined){
        res.status(500).end();
        return;
    }
    CategoryController.deleteUser(idCategory)
        .then((category) => {
            res.status(201).json(category);
        })
        .catch((err) => {
            console.error(err);
        })
});

categoryRouter.put('/updateCategory' , function(req,res){
    const name = req.body.name;

    CategoryController.updateCategory(name)
        .then(()=>{
            console.log("La categorie a été mis à jour");
        })
        .catch((err) => {
            console.error(err);
        })
});