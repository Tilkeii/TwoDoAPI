const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const CategoryController = controllers.CategoryController;

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());


categoryRouter.post('/', function(req, res) {
    const name = req.body.name;

    const category = CategoryController.addCategory(name)
        .then((category) => {
            res.status(201).json(category);
        })
        .catch((err) => {
            res.status(500).end();
        });
});

categoryRouter.get('/getAll', function(req, res) {

    CategoryController.getAllCategory()
        .then((categories) => {
            res.status(201).json(categories);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

categoryRouter.get('/getById/:id' , function(req,res){
    CategoryController.getCategoryById(req.params.id)
        .then((category) => {
            if(category) {
                res.status(200).json(category);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

categoryRouter.delete('/delete/:idCategory' , function(req,res){
    const idCategory = req.params.idCategory;

    if(idCategory === undefined){
        res.status(500).end();
        return;
    }

    CategoryController.deleteCategory(idCategory)
        .then((category) => {
            if(category) {
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

categoryRouter.put('/update' , function(req,res){
    const idCategory = req.body.id;
    const name = req.body.name;

    CategoryController.updateCategory(idCategory, name)
        .then((category) => {
            if(category) {
                console.log("Category was successfully updated.");
                res.status(200).json(category);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        })
});

module.exports = categoryRouter;