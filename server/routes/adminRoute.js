const express = require('express');
const multer = require('multer');
const path = require('path');

const route = express();

const adminController = require('../controller/adminController');


// Set views directory
route.set('views', './views/admin');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/amale/OneDrive/Desktop/Grocyish/public/user/assets/images/productImages') // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original filename
    }
});

// Multer instance with configured storage
const upload = multer({ storage: storage });



route.get('/login',adminController.getAdminLogin)
route.post('/adminhome',adminController.postAdminLogin)
route.get('/adminHome',adminController.getAdminDashboard)
route.get('/categories',adminController.getCategories)

route.get('/edit-category', adminController.editCategoryPage);
route.post('/edit-category',adminController.editedCategory)

route.get('/add-category',adminController.getAddCategories)
route.post('/add-category',adminController.postAddCategory)
route.get('/customers',adminController.getCustomers)
route.get('/order-list',adminController.getOrderList)

route.get('/products',adminController.getProducts)
route.get('/add-product',adminController.getAddProduct)
route.post('/addNewProduct',upload.array('files',5),adminController.postCreateProduct)
route.get('/edit-product',adminController.editProduct)
route.post('/update-product',adminController.updatedproductPage)
route.get('/deleted-product',adminController.deletedproductPage)
route.get('/product-deleted',adminController.deletingProduct)


route.get('/vendor',adminController.getVendor)
route.get('/reviews',adminController.getReviews)
route.get('/block-user',adminController.userBlock)
route.get('/category-deleted',adminController.categoryDeleting)
route.get('/deleted-category',adminController.deletedCategory)
// route.get('/unblock-user',adminController.userUnblock)

// Assuming you are using Express.js


// route.post('/soft-delete-category', adminController.softDeleteCategory);

module.exports = route