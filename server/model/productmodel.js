
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    selectedCategory: {
        type: String,
        required: true
    },
    itemWeight: {
        type : Number,
        value: Number,
        unit: String,
        required: true
    },
    // inStock: Boolean,
    productCode: String,
    stockKeepingUnit: String,        // stock keeping unit
    status: {
        type: String,
        enum: ['Active', 'Disabled'],
        default: 'Active',
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    selectUnits : {
        type : Number,
        required: true
    },
    metaTitle: {
        type: String,
        description: String,
        required: true
    },
    metaDescription : {
        type : String,
        required: true
    },
    description : {
        type : String
    },
    image : [
         String
        // type: Buffer
    ],
    contentType: {
        type: String, // Mime type of the image
        // required: true
    },
    deletedAt : {
        type : String,
        default : 'Not-Deleted'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
