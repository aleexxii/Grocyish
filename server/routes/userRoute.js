const express = require('express')
const route = express()
const path = require('path')

const userController = require('../controller/userController')
const {verifyJWT,checkAuthenticated} = require('../../middleware/authentication')

route.set('views','./views/user')
// route.use(express.static('public'))


route.get('/',userController.landingPage)
route.get('/login',userController.getLogin)
route.post('/login',userController.postLogin)
route.get('/signup',checkAuthenticated,userController.getSignup)
route.get('/home',verifyJWT,userController.getHome)
route.post('/signup',userController.postSignup)
route.get('/forgot-password',userController.getForgotPassword)
route.post('/generate-otp',userController.getOtp)
route.get('/wishlist',verifyJWT,userController.getwishlist)
route.get('/category-list',userController.getCategoryList)
route.get('/product-list/:productId',userController.getProductList)




module.exports = route


