const Admin = require("../model/adminLoginModel");
const Product = require("../model/productmodel");
const Category = require("../model/categoryModel");
const User = require("../model/model");
const { isArray } = require("lodash");

const getProducts = async (req, res) => {
  try {
    let search = "";
    if (req.query.search) {
      search = new RegExp(".*" + req.query.search + ".*", "i");
    }

    // Check if search query can be parsed as a number
    const isNumber =
      !isNaN(parseFloat(req.query.search)) && isFinite(req.query.search);

    const limit = 10;
    let page = req.query.page ? parseInt(req.query.page) : 1;

    const product = await Product.find({
      deletedAt: "Not-Deleted",
      $or: [
        { productName: { $regex: search } },
        { selectedCategory: { $regex: search } },
        isNumber ? { salePrice: parseFloat(req.query.search) } : {},
      ],
    })
      .limit(limit)
      .skip((page - 1) * limit)   // page = 1 - 1 * 10 = 0 , first page skip = 0 , second page skip the first 10 products
      .exec();

    const totalProductCount = await Product.find({
      deletedAt: "Not-Deleted",
      $or: [
        { productName: { $regex: search } },
        { selectedCategory: { $regex: search } },
        isNumber ? { salePrice: parseFloat(req.query.search) } : {},
      ],
    }).countDocuments();

    // console.log('this is proddu ',products);
    const products = product.map((product) => {
      return { ...product._doc };
    });

    // Sort categories by _id in descending order
    products.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

    res.render("products", {
      products,
      totalProductCount,
      totalPages: Math.ceil(totalProductCount / limit),
      currentPage: page,
      previous: page > 1 ?  page - 1 : null,
      next: page < Math.ceil( totalProductCount / limit ) ? page + 1 : null,
      limit 
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddProduct = async (req, res) => {
  try {
    const categories = await Category.find({ deletedAt: "listed" });

    // const categories = category.map((category)=>{
    //   return {...category._doc}
    // })

    // console.log('category log',category._doc[0]);

    res.render("addProduct", { categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const postCreateProduct = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Uploaded files:", req.file);

    // Destructure required fields from req.body
    const {
      productName,
      selectedCategory,
      itemWeight,
      selectUnits,
      product_Code,
      stock_keeping_unit,
      regular_price,
      sale_price,
      meta_title,
      meta_description,
    } = req.body;

    // Extract filenames from uploaded files
    const images = req.files.map((file) => file.filename);
    // console.log(images, "image name");

    // Create a new Product instance
    const newProduct = new Product({
      productName,
      selectedCategory,
      itemWeight,
      selectUnits,
      productCode: product_Code,
      stockKeepingUnit: stock_keeping_unit,
      regularPrice: regular_price,
      salePrice: sale_price,
      metaTitle: meta_title,
      metaDescription: meta_description,
      // Assuming description is defined elsewhere
      // description: description,
      image: images, // Save image filenames
    });
    // console.log(newProduct, "ithane new oriduct");
    // Save the new product to the database
    await newProduct.save();

    // Respond with success status and redirection URL
    res.status(200).json({ redirect: "./products" });
  } catch (error) {
    console.error("Error creating product:", error);
    // Respond with error status and message
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });
  }
};

const editProduct = async (req, res) => {
  try {
    const product_Id = req.query.productId;
    // console.log("this is product id -> ", product_Id);

    const productEditingPage = await Product.findById(product_Id);

    const category = await Category.find();
    const categories = category.map((category) => {
      return { ...category._doc };
    });

    if (!productEditingPage) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.render("editProduct", { productEditingPage, categories });
  } catch (error) {
    console.log(error);
  }
};

const updatedproductPage = async (req, res) => {
  try {
    const updatedQueryId = req.query.productId;
    // console.log(req.files,'from the files');
    const {
      productName,
      category,
      weight,
      units,
      stock,
      productCode,
      productSKU,
      regularPrice,
      salePrice,
      metaTitle,
      metaDescription,
      description,
    } = req.body;

    const existingProduct = await Product.findOne({deletedAt : 'Not-Deleted', productName , _id : {$ne : updatedQueryId}})

    // console.log(existingProduct , '<-------existingProduct');

    if(existingProduct){
      return res.status(200).json({existingError : 'Product already exists'})
    }


// Extract existing and new filenames from FormData
// console.log(req.body.existingImages , '<-----req.body.existingImages');
const existingImages = Array.isArray(req.body.existingImages) ? req.body.existingImages : [];
const newImages = req.files ? req.files.map((file) => file.filename) : [];

// Combine existing and new images
const images = [...new Set([...existingImages, ...newImages])];
// console.log(images);
    // Extract filenames from uploaded files
    // const images = req.files.map((file) => file.filename);
    // Update the product instance
    const updatedProduct = await Product.findByIdAndUpdate(
      updatedQueryId,
      {
        productName,
        category,
        weight,
        units,
        stock: stock || false,
        productCode,
        productSKU,
        description,
        regularPrice,
        salePrice,
        metaTitle,
        metaDescription,
        image: images,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Product updated successfully
    return res.status(200).json({ redirect: "/admin/products" });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating product" });
  }
};

const deletedproductPage = async (req, res) => {
  const deletedProduct = await Product.find({ deletedAt: "Deleted" });
  const deletedProducts = deletedProduct.map((deletedProd) => {
    return { ...deletedProd._doc };
  });
  res.render("deletedProducts", { deletedProducts });
};

const deletingProduct = async (req, res) => {
  const produceId = req.query.productId;
  // console.log("product id for deleting ->", produceId);
  await Product.findByIdAndUpdate(
    produceId,
    { deletedAt: "Deleted" },
    { new: true }
  );
  res.redirect("./products");
};

module.exports = {
  getProducts,
  getAddProduct,
  postCreateProduct,
  editProduct,
  updatedproductPage,
  deletingProduct,
  deletedproductPage,
};
