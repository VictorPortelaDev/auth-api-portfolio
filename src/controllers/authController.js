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

const login = async (req, res) => {
  try {
    const {email, password} = req.body || {};

    const result = await authService.login({ email, password });

    return res.status(200).json({
      message: "Login successful",
      ...result
    });

  } catch (error) {
    const allowedStatusCodes = [400, 401, 403, 404, 409];

    const statusCode = allowedStatusCodes.includes(error.statusCode)
    ? error.statusCode 
    : 500;

    if(statusCode === 500) {
      console.error("[AuthController - Login Error]: ", error);
    }

    return res.status(statusCode).json({
      error: statusCode === 500 ? "Internal server error" : error.message,
    });
  }
}
module.exports = {
    register,
    login
};