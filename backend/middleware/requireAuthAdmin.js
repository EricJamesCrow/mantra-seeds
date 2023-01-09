const requireAuthAdmin = async (req, res, next) => {
    console.log("Triggered requireAuthAdmin middleware"); // <-- add this line
    // verify authentication
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
  
    const token = authorization.split(" ")[1];
  
    try {
      const { _id, role } = jwt.verify(token, process.env.SECRET);
  
      if (role !== 1) {
        return res.status(403).json({ error: "Forbidden" });
      }
  
      req.user = await User.findOne({ _id }).select("_id");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Request is not authorized" });
    }
  };

module.exports = requireAuthAdmin
  