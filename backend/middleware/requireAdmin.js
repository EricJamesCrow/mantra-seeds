const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuthAdmin = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization;
  
    try {
      const { _id, role } = jwt.verify(token, process.env.SECRET);
  
      if (role !== 1) {
        console.log("Forbidden")
        return res.status(403).json({ error: "Forbidden" });
      }
  
      req.user = await User.findOne({ _id }).select("_id");
      console.log("Authorized")
      next();
    } catch (error) {
      console.log(error);
      console.log("Unauthorized");
      res.status(401).json({ error: "Request is not authorized" });
    }
  };

module.exports = requireAuthAdmin
  