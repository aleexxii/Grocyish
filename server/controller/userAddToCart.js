const Product = require('../model/productmodel')
const CartItem = require('../model/addToCart')

// const postAddToCart = async (req,res)=>{
//     const productId = req.body.productId
//     console.log(productId , 'productId');
    
//     const userId = req.user.userId
//     console.log(userId , 'userId from the request');
//     try {
//         const product = await Product.findById(productId)
//         console.log(product , 'product details');

//         let cart = await CartItem.findOne({userId})
//         if(!cart){
//             cart = new cart({ userId , items : [] })
//         }
//         const cartItem = new CartItem({
//             user: userId,
//             productId: productId,
//             quantity: 1, // Default quantity is 1
//             price: product.price
//           });
//           console.log(cartItem , 'cart items');
//         const existingItem = cart.items.find((item) => item.productId.toString() === productId)

//         if(existingItem){
//             existingItem.quantity += 1
//         }else{
//             cart.items.push({productId , quantity : 1})
//         }

//         await cartItem.save();

//         res.status(200).json({message : 'Product added to cart' })
//     } catch (error) {
        
//     }
//     // const product = await Product.findById(productId)
//     // console.log(product, 'product');

//     // if(!product){
//     //     return res.status(400).json({message : 'Product is not found'})
//     // }

//     // const cartItem = new CartItem({
//     //     user : userId,
//     //     productId : productId,
//     //     quantity : 1, //Default quantity is 1
//     //     price : product.price
//     // })

//     // await cartItem.save()
//     // // res.render({ product })
//     // res.status(200).json({message : 'Product added to cart' , cartItem})
// }

const postAddToCart = async (req, res) => {
    try {
    const {productId} = req.body.productId;
  
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    const userId = req.user.userId;

      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      let cartItem = await CartItem.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
            return res.status(200).json({ message: 'Product quantity updated in cart' });
        }
  
    //   const existingCartItem = await CartItem.findOne({ userId, productId });
  
    //   if (existingCartItem) {
    //     existingCartItem.quantity += 1;
    //     await existingCartItem.save();
    //     return res.status(200).json({ message: 'Product quantity updated in cart' });
    //   }
  
       cartItem = new CartItem({
        userId,
        productId,
        price: product.price,
      });
  
      await cartItem.save();
  
      res.status(200).json({ message: 'Product added to cart' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding product to cart' });

    }
  };


  const getAddToCart = async (req,res)=>{
    const userId = req.user.userId
    try{
        const cart = await CartItem.find({ userId }).populate('productId')

        res.render('addToCart' , {cart} )
    } catch (err){
        console.log(err);
        res.status(500).json({message : 'error fetching cart'})
    }
    
}


module.exports = {
    getAddToCart,
    postAddToCart
}