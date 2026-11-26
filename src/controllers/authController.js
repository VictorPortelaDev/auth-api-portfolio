const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });

    return res.status(201).json({
        message:"User registered successfully",
        user,
    });
  } catch (error) {
    console.error("Register error: ", error);
    
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        error:
         statusCode === 500 
         ? "Internal server error" 
         : error.message,
    });
  }
};

module.exports = {
    register,
};