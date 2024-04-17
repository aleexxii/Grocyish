const jwt = require('jsonwebtoken')


// Function to generate a JWT
async function generateJWT(user , res) {
    // JWT payload containing user information
    const payload = {
      userId: user.id,
      username: user.fname,
      role: 'user',
    };
  
    // JWT options: expiresIn specifies the token's expiration time (e.g., 1 hour)
    const options = {
      expiresIn: '1h',
    };
  
    // Generate and return the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY , options);
    res.cookie('userToken' , token , {
        maxAge : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    })
  }



  module.exports ={
    generateJWT
  }