const express = require('express')
const route = express()
const path = require('path')
const passport = require('passport')
const { getGoogleURL , getUserFromGoogle } =require('../helper/OAuth')

const userController = require('../controller/userController')
const {verifyJWT,checkAuthenticated , isBlocked } = require('../../middleware/authentication')

route.set('views','./views/user')
// route.use(express.static('public'))

route.get('/',userController.landingPage)
route.get('/login',userController.getLogin)
route.post('/login',isBlocked,userController.postLogin)
route.get('/signup',checkAuthenticated,userController.getSignup)
route.get('/home',verifyJWT,isBlocked,userController.getHome)
route.post('/signup',userController.postSignup)
route.get('/forgot-password',userController.getForgotPassword)
route.post('/generate-otp',userController.getOtp)
route.get('/wishlist',verifyJWT,isBlocked,userController.getwishlist)
route.get('/category-list',verifyJWT,isBlocked,userController.getCategoryList)
route.get('/product-list/:productId',verifyJWT,isBlocked,userController.getProductList)
route.get('/account-orders',verifyJWT,isBlocked,userController.userOrders)
route.get('/logout',verifyJWT,isBlocked,userController.userLogOut)


// Google Auth Routes
route.get("/auth/google", getGoogleURL);
route.get("/google/callback", getUserFromGoogle);





module.exports = route


