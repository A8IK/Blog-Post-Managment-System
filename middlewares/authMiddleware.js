const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:", decoded);
      
      req.user = decoded;  
      next();               // Proceed to the next middleware or route
    } 
    catch (error) {
        console.log("JWT Verification Error:", error.message);
      return res.status(403).json({ message: "Access Denied" });
    }
  } 
  else {
    console.log("No Authorization Header Found");
    return res.status(401).json({ message: "Access Denied" });
  }
};

module.exports = { authenticate };
