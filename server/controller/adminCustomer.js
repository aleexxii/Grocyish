const { regex } = require("uuidv4");
const User = require("../model/model");
const { options, search } = require("../routes/userRoute");

const getCustomers = async (req, res) => {
    try {

      let search = '';
      if(req.query.search){
        search = new RegExp('.*' + req.query.search + '.*' , 'i')
      }

      const custo = await User.find({$or : [
        {fname : { $regex : search }},
        {lname : { $regex : search}},
        {email : { $regex : search}}
      ]});
  
      let customers = custo.map((user) => {
        return {...user._doc}
      })
      // const page = Number(req.query.page) || 1;
      // const limit = Number(req.query.limit) || 5;
      
      res.render("customers", { customers });
    } catch (error) {
      console.log(error);
    }
  };
  
  const userBlock = async (req, res) => {
    try {
      // Find the user by ID in the database
      const userId = req.query.id;
      console.log("ithanu user id  ->", req.query.id);
      const user = await User.findByIdAndUpdate(
        userId,
        {status : 'Blocked'},
        {new : true});
      console.log("update cheyyan ulla user", user);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // // Respond with a success message
      res.redirect("./customers");
    } catch (error) {
      console.error("Error blocking user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while blocking the user" });
    }
  };
  
  const userUnblock = async (req, res) => {
  
      try {
          // Find the user by ID in the database
          const userId = req.query.userId;
          console.log('ithanu unblock user id  ->',userId);
          const user = await User.findById(userId);
  
          if (!user) {
              return res.status(404).json({ error: 'User not found' });
          }
  
          // Update the user's status to 'blocked'
          user.status = 'Unblocked';
  
          // Save the updated user in the database
          await user.save();
  
          // Respond with a success message
          res.redirect('./customers')
      } catch (error) {
          console.error('Error blocking user:', error);
          res.status(500).json({ error: 'An error occurred while blocking the user' });
      }
  };

  module.exports = {
    getCustomers,
    userBlock,
    userUnblock
  }