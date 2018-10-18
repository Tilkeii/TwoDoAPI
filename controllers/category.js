const ModelIndex = require('../models');
const Category = ModelIndex.Category;

const CategoryController = function() {};

CategoryController.addCategory = function(name){
    return Category.addCategory({
        name: name,
    })
};

CategoryController.deleteCategory = function(idCategory){
    return Category.destroy({
        where:{
            id: idCategory
        }
    })
        .then(() => {
            console.log("La catégorie a été supprimé.");
        })
        .catch((err) => {
            console.error(err);
        })
};

CategoryController.updateCategory = function(idCategory, name){
    const category = Category.find({
        where:{
            id: idCategory
        }
    });

    if(category === undefined){
        return;
    }

    if(name === undefined) {
        name = category.name;
    }


    category.updateAttributes({
        name: name
    });

    return category;
};

UserController.getCategoryById = function(categoryId){
    return Category.find({
        where: {
            id: categoryId
        }
    })
        .then((category) => {
            console.log('Category trouvé');
            return category;
        })
        .catch((error) => {
            console.error(err);
        });
};

UserController.getAllCategory = function(){
    return Category.findAll()
        .catch((err) => {
            console.error(err);
        });
};

CategoryController.deleteCategory = function(idCategory){
    return Category.destroy({
        where:{
            id: idCategory
        }
    })
        .then(() => {
            console.log("La catégorie a été supprimée.");
        })
        .catch((err) => {
            console.error(err);
        })
};

module.exports = CategoryController;