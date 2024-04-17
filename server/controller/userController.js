const User = require("../model/model");
const Category = require('../model/categoryModel')
const Products = require('../model/productmodel')
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const OTP = require("../model/userOtpSchema");
const { cloneDeep } = require("lodash");
require("dotenv");
const jwt = require('jsonwebtoken');
const Product = require("../model/productmodel");
const {generateJWT} = require('../helper/setJwtToken');
const { render } = require("../routes/userRoute");


const landingPage = async (req,res)=>{
try {
  const categoryItems = await Category.find({deletedAt : 'listed'})
  const productItems = await Product.find({deletedAt : 'Not-Deleted'})
  res.render('landingPage' , { categoryItems , productItems })
} catch (error) {
  console.log(error);
}
}
const getHome = async (req, res) => {
  try {
    // console.log('session user ==== > ', req.session.user);
    // Check if a user session exists
    // if (req.session.user) {
    //   // Find the user in the database using the email stored in the session
      // const user = await User.findById(req.session.user);
      
      // If the user exists, render the home page with the user's name
      // if (user) {
        const categories = await Category.find({deletedAt : 'listed'})

        // const categories = categ.map((category) => {
        //   return {...category._doc}
        // })

        const product = await Products.find({deletedAt : "Not-Deleted"})

          const products = product.map((product) => {
            return {...product._doc}
          })

        // console.log('ithil enthokke undennu nokk ->',categories);
        return res.render("home",{categories , products});
      // }
    // }
    // If no user session or user not found, redirect to the login page
    // res.redirect("/login");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
//   try {
//     if (req.session.user) {
//       const user = await User.findOne({ email: req.session.user });
//       if (user) {
//         const { name } = user;
//         return res.render("home", { user: name });
//       }
//     }
//     res.redirect("/login");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
};

const getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const postLogin = async (req, res) => {
  let loginErrorMessage = ''
  try {
    const findingUser = await User.findOne({ email: req.body.email });
    console.log("user from database =>", findingUser);

    if (!findingUser) {
      loginErrorMessage = 'Invalid email or password';
      return res.render('login', { loginErrorMessage });
  }

    bcrypt.compare(req.body.password, findingUser.password, async (err, result) => {
      if (err) {
        // Handle error
        console.error(err);
        const loginErrorMessage = 'Internal server Error'
        return res.render('login' , {loginErrorMessage})
      }
      if (result) {
        // Passwords match
        console.log("Password matched");
        console.log('findingUser.status========>',findingUser.status);

          if (findingUser.status === 'Unblocked') {
            await generateJWT(findingUser,res)
            res.redirect('/home');
          } else {
           loginErrorMessage = 'Your account has been blocked';
          return res.render('login', { loginErrorMessage });
          }
      } else {
        // Passwords don't match
        console.log("Password mismatch");
        // Set error message
        loginErrorMessage = 'Invalid email or password';
        // Render login page with error message
        return res.render('login', { loginErrorMessage });
      }
    });
  } catch (error) {
    console.log(error);
    // Set error message
    loginErrorMessage = 'Internal Server Error';
    // Render login page with error message
    return res.render('login', { loginErrorMessage });
  }
};



const getSignup = (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log(error.message);
  }
};

function generateOTP() {
  // Generate a random number between 1000 and 9999
  return Math.floor(1000 + Math.random() * 9000);
}

// Send OTP to user's email
async function sendOTP(email, otp) {
  // Create a nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail email address
      pass: process.env.GMAIL_PASS, // Your Gmail password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Grocyish" amaleexxii@gmail.com', // Your name and email address
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  });

  console.log("Message sent: %s", info.messageId);
}

// Handle POST request to generate and send OTP
const getOtp = async (req, res) => {
  const { email } = req.query;

  try {
    // Generate OTP
    const generatedOTP = generateOTP();

    // Save OTP in database and send OTP to user's email
    await Promise.all([
      OTP.create({ email, otp: generatedOTP }),
      sendOTP(email, generatedOTP),
    ]);

    res.status(200).send("OTP sent successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error occurred while sending OTP");
  }
};

const postSignup = async (req, res) => {
  try {
    // Extract user details from request body
    const { firstname, lastname, email, password, otp } = req.body;
    console.log(req.body);

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email: email });

    // If the user with the same email already exists, return an error
    if (existingUser !== null) {
      return res.status(200).json({ emailError: "Email already exists" });
    } else {
      const userOTP = await OTP.findOne({ email });
      // If the user's OTP is found in the database
      if (userOTP) {
        // Compare the user-provided OTP with the OTP from the database
        if (otp === userOTP.otp) {
          console.log(otp, "userotp => ", userOTP.otp);

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create a new user
          const newUser = new User({
            fname: firstname,
            lname: lastname,
            email: email,
            password: hashedPassword,
            otp: otp,
          });

          // Save the new user
          await newUser.save();

          // If the OTPs match, redirect to the login page
          res.status(200).json({ redirect: "/login" });
        } else {
          // If the OTPs don't match, show an error message
          res.status(200).json({ otpError: "Invalid otp" });
        }
      } else {
        // If the user's OTP is not found in the database, show an error message
        res.status(200).json({ otpError: "otp not found" });
      }
    }

    // Send a response indicating successful signup
    // res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error:", error);

    // Send a response indicating internal server error
    res.status(200).json({ message: "Internal server error" });
  }
};

const getForgotPassword = (req, res) => {
  try {
    res.render("forgotPassword");
  } catch (error) {
    console.log(error);
  }
};

const getwishlist = (req , res)=>{
  res.render('wishlist')
}

const getCategoryList =(req , res)=>{
  try {
    res.render('category-list')
  } catch (error) {
    console.log(error);
  }
}

const getProductList = async (req , res)=>{
try {
  const productId = req.params.productId
  console.log(productId,'<-----product id ');

  const products = await Product.findById(productId)
console.log(products,'<------ product');
  if(!products){
    return res.status(404)
  }
  res.render('single-product' , { products })
} catch (error) {
  console.log(error);
}
}

module.exports = {
  landingPage,
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getForgotPassword,
  getOtp,
  getHome,
  getwishlist,
  getCategoryList,
  getProductList
};
