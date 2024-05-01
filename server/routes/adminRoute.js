const express = require('express');
const route = express();


const adminController = require('../controller/adminController');
const adminCategory = require('../controller/adminCategory')
const adminProduct = require('../controller/adminProduct')
const adminCustomerdetails = require('../controller/adminCustomer')
const productImageMulter = require('../../middleware/productImageMulter')
const categoryImageMulter = require('../../middleware/categoryImages')

// Set views directory
route.set('views', './views/admin');


route.get('/login',adminController.getAdminLogin)
route.post('/adminhome',adminController.postAdminLogin)
route.get('/adminHome',adminController.getAdminDashboard)

//CATEGORIES

route.get('/categories',adminCategory.getCategories)
route.get('/add-category',adminCategory.getAddCategories)
route.post('/add-category',categoryImageMulter.single('file'),adminCategory.postAddCategory)
route.get('/edit-category', adminCategory.editCategoryPage);
route.post('/edit-category',categoryImageMulter.single('file'),adminCategory.editedCategory)
route.get('/category-deleted',adminCategory.categoryDeleting)
route.get('/deleted-category',adminCategory.deletedCategory)


//CUSTOMERS

route.get('/customers',adminCustomerdetails.getCustomers)
route.post('/block-user',adminCustomerdetails.userBlock)
route.post('/unblock-user',adminCustomerdetails.userUnblock)

route.get('/order-list',adminController.getOrderList)

//PRODUCTS

route.get('/products',adminProduct.getProducts)
route.get('/add-product',adminProduct.getAddProduct)
route.post('/addNewProduct',productImageMulter.array('files',5),adminProduct.postCreateProduct)
route.get('/edit-product',adminProduct.editProduct)
route.post('/update-product',productImageMulter.any(),adminProduct.updatedproductPage)
route.get('/deleted-product',adminProduct.deletedproductPage)
route.get('/product-deleted',adminProduct.deletingProduct)


route.get('/vendor',adminController.getVendor)
route.get('/reviews',adminController.getReviews)


module.exports = route