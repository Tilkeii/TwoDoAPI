const ModelIndex = require('../models');
const Category = ModelIndex.Category;

const CategoryController = function() {};

CategoryController.addCategory = function(name){
    return Category.create({
        name: name,
    })
        .catch((err) => {
            console.error(err);
        })
};

CategoryController.deleteCategory = function(idCategory){
    return Category.destroy({
        where:{
            id: idCategory
        }
    })
        .then((category) => {
            if(category) {
                console.log("Category has been deleted.");
                return true;
            }
        })
        .catch((err) => {
            console.error(err);
        })
};

CategoryController.updateCategory = function(idCategory, name){
    return Category.find({
        where:{
            id: idCategory
        }
    })
        .then((category) => {
            if(category === undefined){
                return;
            }

            if(name === undefined) {
                name = category.name;
            }

            return category.updateAttributes({
                name: name
            });
        });
};


CategoryController.getCategoryById = function(idCategory){
    return Category.find({
        where: {
            id: idCategory
        }
    })
        .then((category) => {
            if(category === undefined) {
                return;
            }
            console.log('Category found.');
            return category;
        })
        .catch((error) => {
            console.error(error);
        });
};

CategoryController.getAllCategory = function(){
    return Category.findAll()
        .catch((err) => {
            console.error(err);
        });
};


module.exports = CategoryController;