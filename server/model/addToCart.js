const mongoose = require('mongoose')



const cartItemSchema = new mongoose.Schema({
    userId: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    price: Number,

})

const cartItem = mongoose.model('cartitem' , cartItemSchema )

module.exports = cartItem