const express = require('express')
const route = express()
const path = require('path')
const passport = require('passport')
const { getGoogleURL , getUserFromGoogle } =require('../helper/OAuth')

const userController = require('../controller/userController')
const forgotPassword = require('../controller/userForgotPassword')
const addToCart = require('../controller/userAddToCart')
const accountSettings = require('../controller/accountSettingsController')
const accountAddress = require('../controller/accountAddressController')
const {verifyJWT,checkAuthenticated , isBlocked } = require('../../middleware/authentication')

route.set('views','./views/user')
// route.use(express.static('public'))

route.get('/',userController.landingPage)
route.get('/login',userController.getLogin)
route.post('/login',userController.postLogin)
route.get('/signup',checkAuthenticated,userController.getSignup)
route.post('/signup',userController.postSignup)
route.get('/home',verifyJWT,isBlocked,userController.getHome)
route.post('/generate-otp',userController.getOtp)
route.get('/wishlist',verifyJWT,isBlocked,userController.getwishlist)
route.get('/category-list',verifyJWT,isBlocked,userController.getCategoryList)
route.get('/product-list/:productId',verifyJWT,isBlocked,userController.getProductList)
route.get('/account-orders',verifyJWT,isBlocked,userController.userOrders)
route.get('/logout',verifyJWT,isBlocked,userController.userLogOut)

route.get('/forgot-password',forgotPassword.getForgotPassword)
route.post('/forgot-password',forgotPassword.postForgotPassword)
route.get('/reset-password/:Id/:timestamp',forgotPassword.resetPassword)
route.post('/reset-password',forgotPassword.updatePassword)

// ADD TO CART

route.get('/addToCart' ,verifyJWT,isBlocked,addToCart.getAddToCart)
route.post('/addToCart' ,verifyJWT,isBlocked,addToCart.postAddToCart)

// Google Auth Routes
route.get("/auth/google", getGoogleURL);
route.get("/google/callback", getUserFromGoogle);

// ACCOUNT SeTTINGS

route.get('/account-settings',verifyJWT,isBlocked,accountSettings.getAccountSettings)
route.post('/account-settings',verifyJWT,isBlocked,accountSettings.postAccountSettings)
route.post('/account-forgetPassword',verifyJWT,isBlocked,accountSettings.postAccountForgetPassword)

// ACCOUNT ADDRESS

route.get('/account-address',verifyJWT,isBlocked,accountAddress.getAddress)
route.post('/account-address',verifyJWT,isBlocked,accountAddress.postAddress)
route.delete('/delete-address/:addressId',verifyJWT,isBlocked,accountAddress.deleteAddress)
route.post('/edit-address/:addressId',verifyJWT,isBlocked,accountAddress.postEditAddress)

module.exports = route


