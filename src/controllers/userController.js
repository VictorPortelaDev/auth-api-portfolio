const userRepository = require("../repositories/userRepository");

const getProfile = async (req, res) => {
  try {
    const user = await userRepository.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("[userController - Get Profile Error]: ", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { getProfile };
