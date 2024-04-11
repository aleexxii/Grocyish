const express = require('express')
const route = express()
const path = require('path')

const userController = require('../controller/userController')

route.set('views','./views/user')
// route.use(express.static('public'))



route.get('/login',userController.getLogin)
route.post('/login',userController.postLogin)
route.get('/signup',userController.getSignup)
route.get('/home',userController.getHome)
route.post('/signup',userController.postSignup)
route.get('/forgot-password',userController.getForgotPassword)
route.post('/generate-otp',userController.getOtp)
route.get('/wishlist',userController.getwishlist)
route.get('/product-list',userController.getProductList)




module.exports = route


