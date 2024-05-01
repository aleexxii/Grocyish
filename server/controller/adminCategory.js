const Admin = require("../model/adminLoginModel");
const Product = require("../model/productmodel");
const Category = require("../model/categoryModel");
const User = require("../model/model");

const getCategories = async (req, res) => {
  try {
    let search = "";
    if (req.query.search) {
      search = new RegExp(".*" + req.query.search + ".*", "i");
    }

    let limit = 5;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    // Fetch categories from database
    const category = await Category.find({
      deletedAt: "listed",
      $or: [{ categoryName: { $regex: search } }],
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const categoryCount = await Category.find({
      deletedAt: "listed",
      $or: [{ categoryName: { $regex: search } }],
    }).countDocuments();

    const categories = category.map((category) => {
      return { ...category._doc };
    });

    // Sort categories by _id in descending order
    categories.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
    // Array to store categories with product counts
    const categoryWithProductCount = [];
    for (const category of categories) {
      const productCount = await Product.countDocuments({
        selectedCategory: category.categoryName,
        deletedAt: "Not-Deleted",
      });
      categoryWithProductCount.push({
        category: category,
        productCount: productCount,
      });
    }
    // console.log("this is product count", categoryWithProductCount);
    res.render("categories",
     {
      categoryWithProductCount,
      categoryCount,
      limit,
      currentPage : page,
      totalPages : Math.ceil(categoryCount / limit),
      previous : page > 1 ? page - 1 : null,
      next : page < Math.ceil( categoryCount / limit ) ? page + 1 : null
    }); // Pass categories data to the template
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
    const categoryId = req.query.categoryId; // Access category ID from req.query

    const { categoryName , slug , parentCategory , date , metaTitle , metaDescription , description } = req.body;

    const existingCategory = await Category.findOne({
      deletedAt : 'listed',
      categoryName,
      _id : {$ne : categoryId }
    })

    if(existingCategory){
      return res.status(200).json({existingCategoryError : 'Category already exists'})
    }

    // console.log(req.file , '<--------request files');

   
    
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId ,
      { categoryName: req.body.categoryName,
        slug : slug,
        parentCategory : parentCategory ,
        date : date ,
        description : description ,
        metaTitle : metaTitle ,
        metaDescription : metaDescription,
        // image : image
      }, // Update category name
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    if(req.file){
      updatedCategory.image = req.file.filename
    }

    await updatedCategory.save();
    // Redirect to categories page after updating
    return res.status(200).json({redirect : "./categories"});

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
    // console.log(req.files, "ith files");
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
      categoryImage,
    } = req.body;
    // console.log("body----->", req.body);

    // Extract filenames from uploaded files
    const image = req.file.filename;
    // console.log(image, "image name");

    const existingCategory = await Category.findOne({ categoryName });
    // console.log(existingCategory, "existing category");
    if (existingCategory) {
      return res.status(200).json({ Error: "Category is already exists" });
    }

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
      categoryImage,
      image,
    });
    // console.log("newcategory------>", newCategory);
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
  // console.log(categoryId);
  await Category.findByIdAndUpdate(
    categoryId,
    { deletedAt: "unlisted" },
    { new: true }
  );
  res.redirect("./categories");
};

const deletedCategory = async (req, res) => {
  try {
    const deletedCategories = await Category.find({ deletedAt: "unlisted" });

    const deletedCategory = deletedCategories.map((dltcat) => {
      return { ...dltcat._doc };
    });
    res.render("deletedCategories", { deletedCategory });
  } catch (error) {}
};

module.exports = {
  getCategories,
  getAddCategories,
  postAddCategory,
  editCategoryPage,
  editedCategory,
  categoryDeleting,
  deletedCategory,
};
