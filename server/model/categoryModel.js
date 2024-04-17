const mongoose = require('mongoose')

// Define the Schema for the Category Model
const categorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true,
    },
    parentCategory : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    },
    description: {
        type: String
    },
    // status: {
    //     type: String,
    //     enum: ['Active', 'Disabled'],
    //     default: 'Active'
    // },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    deletedAt: {
        type: String,
        default: 'listed'
    },
    image: [{
        type : String
    }]
})

const Category = mongoose.model('Category',categorySchema)
module.exports = Category