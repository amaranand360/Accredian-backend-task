import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Login First',
      });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      pool.query('SELECT * FROM users WHERE id = ?', [decoded._id], async (err, results) => {
        if (err) {
          return next(err);
        }
  
        const user = results[0];
  
        // If the user does not exist, send an error response
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }
  
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
  };
  