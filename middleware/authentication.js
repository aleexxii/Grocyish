const jwt = require('jsonwebtoken')

// Function to verify a JWT

const verifyJWT = (req, res, next) => {
    const token = req.cookies.userToken;
    console.log('token----->',token);
    if (!token) {
      return res.redirect("/login");
      // return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
  
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }
      req.user = user;
      next();
    });
  };


  const checkAuthenticated = (req, res, next) => {
    const token = req.cookies.userToken;
  
    if (token) {
      return res.redirect("/home");
    } else {
      next();
    }
  };

  module.exports = { verifyJWT , checkAuthenticated}