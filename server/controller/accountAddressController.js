const User = require("../model/model");
const customerAddress = require("../model/shippingAddress");

const getAddress = async (req, res) => {
  const userId = req.user.userId;

  const address = await customerAddress.find({ userId });

  res.render("account-address", { address });
};

const postAddress = async (req, res) => {
  const {
    Firstname,
    Lastname,
    Phone,
    Address,
    State,
    District,
    City,
    Pincode,
    Landmark,
  } = req.body;

  const userId = req.user.userId;
  try {
    const newAddress = await customerAddress.create({
      userId,
      firstname: Firstname,
      lastname: Lastname,
      phone: Phone,
      address: Address,
      state: State,
      district: District,
      city: City,
      pincode: Pincode,
      landmark: Landmark,
    });
    return res.status(200).json({ message: "Address added" , redirect : '/account-address'});
  } catch (error) {
    console.log(error);
  }
};

const deleteAddress = async (req, res) => {

  const addressId = req.params.addressId;

  try {
    await customerAddress.findByIdAndDelete(addressId);
    return res.status(200).json({ message : 'Deleted' , redirect: "/account-address" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAddress,
  postAddress,
  deleteAddress,
};
