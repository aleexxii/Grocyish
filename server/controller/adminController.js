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
    console.log(findingAdmin);
    if (findingAdmin && findingAdmin.password == req.body.password) {
      res.render("adminHome");
    } else {
      console.log("somthing missing");
    }
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  try {
 
    const products = await Product.find({deletedAt : 'Not-Deleted'});
    // console.log('this is proddu ',products);
 
    res.render("products", { products });
  } catch (error) {
    console.log(error);
  }
};

const getAddProduct = async (req, res) => {
  try {
    const categories = await Category.find({ deletedAt: 'listed' });
    res.render("addProduct", { categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};


// const postCreateProduct = async (req, res) => {
//   try {
//       const {
//           productName,
//           category,
//           weight,
//           units,
//           stock,
//           productCode,
//           productSKU,
//           regularPrice,
//           salePrice,
//           metaTitle,
//           metaDescription,
//           description
//       } = req.body;

//       let imageData = null;
//       if (req.files['image'] && req.files['image'].length > 0) {

//         console.log('request log  ->',req.file);

//         // Assuming you're only expecting one file, you can access it with req.files['image'][0]
//         const uploadedFile = req.files['image'][0];
//         imageData = {
//             data: uploadedFile.filename,
//             contentType: uploadedFile.mimetype
//         };
//     }

//       // Create a new product instance
//       const newProduct = new Product({
//           productName,
//           category,
//           weight,
//           units,
//           stock: stock || false,
//           productCode,
//           productSKU,
//           description,
//           regularPrice,
//           salePrice,
//           metaTitle,
//           metaDescription,
//           // image: req.file ? req.file.filename : null
//           image: imageData ? imageData.data : null
//       });


//       // Save the product to the database
//       await newProduct.save();
//       console.log('New product:', newProduct);

//       res.redirect("/admin/products");
//   } catch (error) {
//       console.error("Error creating product:", error);
//       res.status(500).json({ error: "An error occurred while creating the product." });
//   }
// };

// const postCreateProduct = async (req, res) => {
//   try {
//     const {
//       productName,
//       category,
//       weight,
//       units,
//       stock,
//       productCode,
//       productSKU,
//       regularPrice,
//       salePrice,
//       metaTitle,
//       metaDescription,
//       description,
//     } = req.body;

//     let imageData = null;
//     if (req.file) {
//       imageData = {
//         data: req.file.filename,
//         contentType: req.file.mimetype,
//       };
//     }

//     // Create a new product instance
//     const newProduct = new Product({
//       productName,
//       category,
//       weight,
//       units,
//       stock: stock || false,
//       productCode,
//       productSKU,
//       description,
//       regularPrice,
//       salePrice,
//       metaTitle,
//       metaDescription,
//       image: req.body.image ? req.body.image.upload.filename : null,
//     //   image: req.body.image.upload.filename,
//     });

//     // Save the product to the database
//     await newProduct.save();
//     console.log('ithanu neew product ',newProduct);

//     res.redirect("/admin/products"); // F I X I T
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the product." });
//   }
// };



const postCreateProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

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
    const images = req.files.map(file => file.filename)
    console.log(images,'image name');

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
console.log(newProduct , 'ithane new oriduct');
    // Save the new product to the database
    await newProduct.save();
    
    // Respond with success status and redirection URL
    res.status(200).json({ redirect: './products' });
  } catch (error) {
    console.error("Error creating product:", error);
    // Respond with error status and message
    res.status(500).json({ error: "An error occurred while creating the product." });
  }
};


const editProduct = async (req, res) => {
  try {
    const product_Id = req.query.productId;
    // console.log("this is product id -> ", product_Id);

    const productEditingPage = await Product.findById(product_Id);
    const categories = await Category.find()

    if (!productEditingPage) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.render("editProduct", { productEditingPage , categories });
  } catch (error) {
    console.log(error);
  }
};


const updatedproductPage = async (req, res) => {
    try {
      const updatedQueryId = req.body.productId;
      console.log("update cheyyan ulla id", updatedQueryId);
  console.log(req.body,'edit product body');
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
  
      // let imageData = null;
      // if (req.file) {
      //   imageData = {
      //     data: req.file.filename,
      //     contentType: req.file.mimetype,
      //   };
      // }
  
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
          image: req.file ? req.file.filename : null,
        },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      // Product updated successfully
      return res.status(200).json({redirect : '/admin/products'})
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: "An error occurred while updating product" });
    }
  };

const deletedproductPage =async (req,res) => {
    const deletedProducts = await Product.find({deletedAt : 'Deleted' })
    res.render('deletedProducts' , {deletedProducts})
  }

const deletingProduct = async (req , res) => {

    const produceId = req.query.productId
console.log('product id for deleting ->', produceId);
    await Product.findByIdAndUpdate(
        produceId,
        {deletedAt : 'Deleted'},
        {new : true})
    res.redirect('./products')
  }


const getCustomers = async (req, res) => {
  try {
    const customers = await User.find();
    // console.log('customer details',customers);
    res.render("customers", { customers });
  } catch (error) {
    console.log(error);
  }
};

const userBlock = async (req, res) => {
  try {
    // Find the user by ID in the database
    const userId = req.query.userId;
    console.log("ithanu user id  ->", userId);
    const user = await User.findByIdAndUpdate(userId);
    console.log("update cheyyan ulla user", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's status to 'blocked'
    user.status = "Blocked";

    // // Save the updated user in the database
    await user.save();

    // // Respond with a success message
    res.redirect("../customers");
  } catch (error) {
    console.error("Error blocking user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while blocking the user" });
  }
};

// const userUnblock = async (req, res) => {

//     try {
//         // Find the user by ID in the database
//         const userId = req.query.userId;
//         console.log('ithanu unblock user id  ->',userId);
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update the user's status to 'blocked'
//         user.status = 'Unblocked';

//         // Save the updated user in the database
//         await user.save();

//         // Respond with a success message
//         res.redirect('../customers')
//     } catch (error) {
//         console.error('Error blocking user:', error);
//         res.status(500).json({ error: 'An error occurred while blocking the user' });
//     }
// };

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ deletedAt: "listed" }); // Fetch categories from database
    console.log("this is category ", categories);

    // Array to store categories with product counts
    const categoryWithProductCount = [];

    for (const category of categories) {
      const productCount = await Product.countDocuments({
        category: category.categoryName,
      });
      categoryWithProductCount.push({
        category: category,
        productCount: productCount,
      });
    }
    console.log("this is product count", categoryWithProductCount);
    res.render("categories", { categoryWithProductCount }); // Pass categories data to the template
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
const editCategoryPage = async (req, res) => {
  try {
    const categoryId = req.query.categoryId; // Extract category ID from query parameter
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.render("editCategory", { category });
  } catch (error) {
    console.error("Error fetching category for editing:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching category for editing" });
  }
};
const editedCategory = async (req, res) => {
  try {
    const categoryId = req.body.Id; // Access category ID from req.query
    console.log("category id --->", categoryId);
    const { categoryName } = req.body;
    console.log("category name -->", categoryName);

    const updatedCategory = await Category.findByIdAndUpdate(
      { categoryId },
      { categoryName: req.body.categoryName }, // Update category name
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    updatedCategory.save(); //not need

    // Redirect to categories page after updating
    return res.redirect("./categories");
  } catch (error) {
    console.error("Error updating category:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating category" });
  }
};

const getAddCategories = (req, res) => {
  res.render("addCategory");
};
const postAddCategory = async (req, res) => {
  try {
    // Extract category data from the request body
    const {
      categoryName,
      slug,
      parentCategory,
      date,
      description,
      status,
      metaTitle,
      metaDescription,
    } = req.body;
    console.log(req.body);
    // Create a new category instance
    const newCategory = new Category({
      categoryName,
      slug,
      parentCategory,
      date,
      description,
      status,
      metaTitle,
      metaDescription,
    });

    // Save the new category to the database
    await newCategory.save();

    // Redirect to the categories page or any other appropriate page
    res.status(200).json({ redirect: "./categories" });
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
const categoryDeleting = async (req, res) => {
    const categoryId = req.query.categoryId;
    console.log(categoryId);
    await Category.findByIdAndUpdate(
      categoryId,
      { deletedAt: "unlisted" },
      { new: true }
    );
    res.redirect("./categories");
  };
const deletedCategory = async (req, res) => {
    try {
      const deletedCategory = await Category.find({ deletedAt: "unlisted" });
      console.log("deletedCategories", deletedCategory);
      res.render("deletedCategories", { deletedCategory });
    } catch (error) {}
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
  getProducts,
  getAddProduct,
  editProduct,
  updatedproductPage,
  deletingProduct,
  deletedproductPage,
  getCustomers,
  userBlock,
  // userUnblock,
  getCategories,
  editCategoryPage,
  editedCategory,
  getAddCategories,
  postAddCategory,
  getVendor,
  getOrderList,
  getAdminDashboard,
  getReviews,
  postCreateProduct,
  categoryDeleting,
  deletedCategory,
};
