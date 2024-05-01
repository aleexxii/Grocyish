const Admin = require("../model/adminLoginModel");
const Product = require("../model/productmodel");
const Category = require("../model/categoryModel");
const User = require("../model/model");




const getAdminLogin = (req, res) => {
  res.render("adminLogin");
};

const getAdminDashboard = (req, res) => {
  res.render("adminHome");
};

const postAdminLogin = async (req, res) => {
  try {
    const findingAdmin = await Admin.findOne({ email: req.body.email });
    // console.log(findingAdmin);
    if (findingAdmin && findingAdmin.password == req.body.password) {
      res.render("adminHome");
    } else {
      console.log("somthing missing");
    }
  } catch (error) {
    console.log(error);
  }
};






const getVendor = (req, res) => {
  res.render("vendor");
};


const getOrderList = (req, res) => {
  res.render("order-list");
};


const getReviews = (req, res) => {
  res.render("reviews");
};






module.exports = {
  getAdminLogin,
  postAdminLogin,
  getVendor,
  getOrderList,
  getAdminDashboard,
  getReviews,
};
